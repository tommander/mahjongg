<?php

$map = [];
$dir = __DIR__ . '/visual-test-result/';

function imageDiff(): bool
{
	global $map, $dir;

	$numDiff = 0;
	$numSame = 0;

	$list = scandir($dir);
	foreach ($list as $idx => $filename) {
		if (in_array($filename, ['.', '..'], true) || !str_ends_with($filename, '.png')) {
			continue;
		}

		printf('Verifying %d/%d "%s"... ', ($idx + 1), count($list), $filename);

		$holotypeFilename = str_replace('chrome', 'firefox', $filename);

		if (!isset($map[$holotypeFilename])) {
			echo "Image holotype is not defined.\n";
			continue;
		}

		$imgToVerify = imagecreatefrompng($dir . $filename);
		if ($imgToVerify === false) {
			echo "Cannot load image to verify.\n";
			continue;
		}

		$imgHolotype = imagecreatefromstring(base64_decode($map[$holotypeFilename]));
		if ($imgHolotype === false) {
			echo "Cannot load image holotype.\n";
			continue;
		}

		$xToVerify = imagesx($imgToVerify);
		$yToVerify = imagesy($imgToVerify);
		if (!is_int($xToVerify) || !is_int($yToVerify)) {
			echo "Cannot load width/height of image to verify.\n";
			continue;
		}

		$xHolotype = imagesx($imgHolotype);
		$yHolotype = imagesy($imgHolotype);
		if (!is_int($xHolotype) || !is_int($yHolotype)) {
			echo "Cannot load width/height of image holotype.\n";
			continue;
		}

		$imgDiff = imagecreatetruecolor($xToVerify, $yToVerify);
		$copyRes = imagecopy($imgDiff, $imgToVerify, 0, 0, 0, 0, $xToVerify, $yToVerify);
		if (!$copyRes) {
			echo "Cannot copy image to verify.\n";
			continue;
		}

		$redOverlay = imagecolorallocatealpha($imgDiff, 255, 0, 0, 63);
		if ($redOverlay === false) {
			echo "Cannot allocate a red overlay color on image diff.\n";
			continue;
		}

		$hasDiff = false;
		for ($x = 0; $x < $xToVerify; $x++) {
			for ($y = 0; $y < $yToVerify; $y++) {
				$iToVerify = imagecolorat($imgToVerify, $x, $y);
				if ($iToVerify === false) {
					echo "Cannot get image to verify color index at [{$x};{$y}].\n";
					continue;
				}
				$cToVerify = imagecolorsforindex($imgToVerify, $iToVerify);
				if ($cToVerify === false) {
					echo "Cannot get image to verify color at [{$x};{$y}].\n";
					continue;
				}

				$cHolotype = ['red' => -1, 'green' => -1, 'blue' => -1, 'alpha' => -1];
				if ($x < $xHolotype && $y < $yHolotype) {
					$iHolotype = imagecolorat($imgHolotype, $x, $y);
					if ($iHolotype === false) {
						echo "Cannot get image holotype color index at [{$x};{$y}].\n";
						continue;
					}
					$cHolotype = imagecolorsforindex($imgHolotype, $iHolotype);
					if ($cToVerify === false) {
						echo "Cannot get image holotype color at [{$x};{$y}].\n";
						continue;
					}
				}

				if (
					!is_array($cToVerify) ||
					!array_key_exists('red', $cToVerify) ||
					!array_key_exists('green', $cToVerify) ||
					!array_key_exists('blue', $cToVerify) ||
					!array_key_exists('alpha', $cToVerify)
				) {
					echo "Incorrect image to verify color at [{$x};{$y}].\n";
					continue;
				}

				if (
					!is_array($cHolotype) ||
					!array_key_exists('red', $cHolotype) ||
					!array_key_exists('green', $cHolotype) ||
					!array_key_exists('blue', $cHolotype) ||
					!array_key_exists('alpha', $cHolotype)
				) {
					echo "Incorrect image holotype color at [{$x};{$y}].\n";
					continue;
				}

				$sameColor = (
					$cToVerify['red'] === $cHolotype['red'] &&
					$cToVerify['green'] === $cHolotype['green'] &&
					$cToVerify['blue'] === $cHolotype['blue'] &&
					$cToVerify['alpha'] === $cHolotype['alpha']
				);

				if (!$sameColor) {
					$numDiff++;
					$hasDiff = true;
					$pixelRes = imagesetpixel($imgDiff, $x, $y, $redOverlay);
					if (!$pixelRes) {
						echo "Cannot set red overlay on img diff at [{$x};{$y}].\n";
					}
					continue;
				}

				$numSame++;
			}
		}

		if ($hasDiff) {
			echo "Differences found.\n";
			imagepng($imgDiff, $dir . 'diff_' . $filename);
			continue;
		}

		echo "Same as holotype.\n";
	}

	echo "Found {$numDiff} differences and {$numSame} same screenshots.\n";

	return true;
}

function loadHolotypes(): bool
{
	global $map, $dir;

	$map = [];
	$holotypesFile = $dir . 'holotypes.json';
	if (file_exists($holotypesFile)) {
		echo "Loading holotypes...\n";
		$json = file_get_contents($holotypesFile);
		if (is_string($json)) {
			$arr = json_decode($json, true);
			if (json_last_error() === JSON_ERROR_NONE && is_array($arr)) {
				$map = $arr;
				return true;
			}
		}
	}

	echo "Creating holotypes...\n";
	$list = scandir($dir);
	foreach ($list as $filename) {
		if (in_array($filename, ['.', '..'], true) || !str_ends_with($filename, '.png') || str_contains($filename, 'chrome')) {
			continue;
		}

		$img = imagecreatefrompng($dir . $filename);
		ob_start();
		imagepng($img);
		$img_bin = ob_get_contents();
		ob_end_clean();
		$map[$filename] = base64_encode($img_bin);
	}

	$map_json = json_encode($map, JSON_PRETTY_PRINT);
	file_put_contents($holotypesFile, $map_json);
	return true;
}

loadHolotypes();
imageDiff();

?>