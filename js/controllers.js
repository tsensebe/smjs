var smCtrl = function($scope,$timeout) {
	$scope.position = 0;
	$scope.jumpState=0;
	$scope.speed = initialSpeed;
	$scope.lvl = 1;
	$scope.dead = false;
	$scope.sky = Array(worldSize+1).join(skyTitle);
	$scope.ground = worldBuilder(worldSize);
	$scope.newGame = true;
	
	// Jump action
	$scope.jump= function(){
		if($scope.jumpState == 0 && !$scope.newGame) $scope.jumpState = 1;
	}
	
	// Reset game state
	$scope.reset = function() {
		$scope.jumpState = 0;
		$scope.position = 0;
		$scope.lvl = 1;
		$scope.dead = false;
		$scope.speed = initialSpeed;
		$scope.sky = Array(worldSize+1).join(skyTitle);
		$scope.ground = worldBuilder(worldSize);
		$scope.newGame = true;
	}
	
	// Game tick
	$scope.run = function() {
		$scope.newGame = false;
		if($scope.position < worldSize) {
			
			if($scope.jumpState == 1) {
				$scope.sky = strReplace($scope.sky, sheepTitle, $scope.position);
				$scope.ground = strReplace($scope.ground, grountTitle, $scope.position-1);
				$scope.jumpState = 2;
			} else {
				if($scope.ground.substr($scope.position, 1) != barrierTitle) {
					if($scope.jumpState==2){
						$scope.sky = strReplace($scope.sky, skyTitle, $scope.position-1);
						$scope.ground = strReplace($scope.ground, sheepTitle, $scope.position);
						$scope.jumpState = 0;
					} else {
						$scope.ground = strReplace($scope.ground, grountTitle, $scope.position-1);
						$scope.ground = strReplace($scope.ground, sheepTitle, $scope.position);
					}
					
				} else {
					$scope.sky = strReplace($scope.sky, skyTitle, $scope.position-1);
					$scope.ground = strReplace($scope.ground, grountTitle, $scope.position-1);
					$scope.ground = strReplace($scope.ground, deadTitle, $scope.position);
					$scope.dead = true;
				}
			}
			
			if(!$scope.dead) {
				$scope.position++;
				$timeout($scope.run, $scope.speed);
			}
		} else {
			$scope.lvl++;
			$scope.sky = Array(worldSize+1).join(skyTitle);
			$scope.ground = worldBuilder(worldSize);
			$scope.speed -= 100;
			$scope.position = 0;
			$timeout($scope.run, $scope.speed);
		}
	}
}
