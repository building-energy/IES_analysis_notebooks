// margin

var leftmargin = 40;

var topmargin = 40;

var movieImageArray = new Array();

var numImages = 13;

var movieWidth = 400;

var movieHeight = 400;

var movieIndex = 0;

var movieSpeed = 10;

//Slider bar variables

var sliderImage = new Image();

var sliderWidth = 400;

var sliderHeight = 32;

//Slider button

var buttonImage = new Image();

var buttonWidth = 16;

var buttonHeight = 32;

var buttonPos = 0

//Play and pause button

var buttonImagePlay = new Image();

var buttonImagePlayPressed = new Image();

var buttonImagePause = new Image();

var buttonImagePausePressed = new Image();

var buttonImageStop = new Image();

var buttonImageStopPressed = new Image();

var buttonImageSpace = new Image();

// Transparent sheet to capture mouse events on slider

var sheetSlider = document.createElement("DIV");

var isSliding = false;

var isPlaying = false;

var isStopped = true;

var mouseDown = false;

var mouseDownStop = false;

//Mouse position

var mouseX = 0;

var mouseY = 0;

var movieborderSpaceLeft = 0;

var movieborderSpaceTop = 0;

function movieSetup(lmargin, tmargin, imageCount, srcName, srcExt, containerDivName)

{

	obj = document.getElementById(containerDivName);

	if(obj == null)

	{

		obj = document.body;

	}

	numImages = imageCount;

	// margin

	leftmargin = lmargin;

	topmargin = tmargin;

	// Create and load array of Sketchup images

	for (i = 0; i < numImages; i++) {

		movieImageArray[i] = new Image();

		movieImageArray[i].src = srcName + i + srcExt;

		movieImageArray[i].style.position = "absolute";

		movieImageArray[i].style.left = movieborderSpaceLeft + "px";

		movieImageArray[i].style.top = movieborderSpaceTop + "px";

		movieImageArray[i].style.width = movieWidth + "px";

		movieImageArray[i].style.height = movieHeight + "px";

		movieImageArray[i].style.display = "none";

		movieImageArray[i].style.zIndex = 0;

		obj.appendChild(movieImageArray[i]);

	}

	// Slider bar setup

	sliderImage.src = "BarHorizontal.bmp";

	sliderImage.style.position = "absolute";

	sliderImage.style.left = movieborderSpaceLeft + (buttonWidth * 3) + "px";

	sliderImage.style.top = movieborderSpaceTop + movieHeight + "px";

	sliderImage.style.width = sliderWidth + "px";

	sliderImage.style.height = sliderHeight + "px";

	sliderImage.style.display = "block";

	sliderImage.style.zIndex = 0;

	obj.appendChild(sliderImage);

	// Slider bar sheet setup

	sheetSlider.id = "sheet";

	sheetSlider.style.position = "absolute";

	sheetSlider.style.left = movieborderSpaceLeft + (buttonWidth*3) + "px";

	sheetSlider.style.top = movieborderSpaceTop + movieHeight +  "px";

	sheetSlider.style.width = sliderWidth + "px";

	sheetSlider.style.height = sliderHeight + "px";

	sheetSlider.style.display = "block";

	sheetSlider.style.zIndex = 2;

	sheetSlider.style.backgroundColor = "FF0000";

	setOpacity(sheetSlider, 0.0);// Makes sheet invisible

	obj.appendChild(sheetSlider);



	// Slider bar mouse event handling

	sheetSlider.onmousedown = handleMouseDownSlider;

	sheetSlider.onmouseup = handleMouseUpSlider;

	sheetSlider.onmouseout = handleMouseUpSlider;

	sheetSlider.onmousemove = handleMouseMoveSlider;

	// Slider button setup

	buttonImage.src = "ButtonS.png";

	buttonImage.style.position = "absolute";

	buttonImage.style.left = Math.floor (movieborderSpaceLeft + buttonPos - (buttonWidth/2)) + "px";

	buttonImage.style.top = movieborderSpaceTop  + movieHeight +  "px";

	buttonImage.style.width = buttonWidth + "px";

	buttonImage.style.height = buttonHeight + "px";

	buttonImage.style.display = 'block';

	buttonImage.style.zIndex = 1;

	obj.appendChild(buttonImage);

	// Stop button setup

	buttonImageStop.src = "ButtonStop.bmp";

	buttonImageStop.style.position = "absolute";

	buttonImageStop.style.left = movieborderSpaceLeft + "px";

	buttonImageStop.style.top = movieborderSpaceTop + movieHeight +  "px";

	buttonImageStop.style.width = buttonWidth + "px";

	buttonImageStop.style.height = buttonHeight + "px";

	buttonImageStop.style.display = 'block';

	buttonImageStop.style.zIndex = 0;

	obj.appendChild(buttonImageStop);

	buttonImageStopPressed.src = "ButtonStopPressed.bmp";

	buttonImageStopPressed.style.position = "absolute";

	buttonImageStopPressed.style.left = movieborderSpaceLeft + "px";

	buttonImageStopPressed.style.top = movieborderSpaceTop + movieHeight +  "px";

	buttonImageStopPressed.style.width = buttonWidth + "px";

	buttonImageStopPressed.style.height = buttonHeight + "px";

	buttonImageStopPressed.style.display = 'none';

	buttonImageStopPressed.style.zIndex = 0;

	obj.appendChild(buttonImageStopPressed);



	// Stop button mouse event handling

	buttonImageStop.onmousedown = handleMouseDownStop;

	buttonImageStop.onmouseup = handleMouseUpStop;

	buttonImageStop.onmouseout = handleMouseUpStop;

	// Play button setup

	buttonImagePlay.src = "ButtonPlay.bmp";

	buttonImagePlay.style.position = "absolute";

	buttonImagePlay.style.left = movieborderSpaceLeft + buttonWidth + "px";

	buttonImagePlay.style.top = movieborderSpaceTop  + movieHeight +  "px";

	buttonImagePlay.style.width = buttonWidth + "px";

	buttonImagePlay.style.height = buttonHeight + "px";

	buttonImagePlay.style.display = 'block';

	buttonImagePlay.style.zIndex = 0;

	obj.appendChild(buttonImagePlay);

	buttonImagePlayPressed.src = "ButtonPlayPressed.bmp";

	buttonImagePlayPressed.style.position = "absolute";

	buttonImagePlayPressed.style.left = movieborderSpaceLeft + buttonWidth + "px";

	buttonImagePlayPressed.style.top = movieborderSpaceTop  + movieHeight + "px";

	buttonImagePlayPressed.style.width = buttonWidth + "px";

	buttonImagePlayPressed.style.height = buttonHeight + "px";

	buttonImagePlayPressed.style.display = 'none';

	buttonImagePlayPressed.style.zIndex = 0;

	obj.appendChild(buttonImagePlayPressed);

	// Play button mouse event handling

	buttonImagePlay.onmousedown = handleMouseDownPlayPause;

	buttonImagePlay.onmouseup = handleMouseUpPlayPause;

	buttonImagePlay.onmouseout = handleMouseUpPlayPause;

	// Pause button setup

	buttonImagePause.src = "ButtonPause.bmp";

	buttonImagePause.style.position = "absolute";

	buttonImagePause.style.left = movieborderSpaceLeft + buttonWidth + "px";

	buttonImagePause.style.top = movieborderSpaceTop  + movieHeight + "px";

	buttonImagePause.style.width = buttonWidth + "px";

	buttonImagePause.style.height = buttonHeight + "px";

	buttonImagePause.style.display = 'none';

	buttonImagePause.style.zIndex = 0;

	obj.appendChild(buttonImagePause);

	buttonImagePausePressed.src = "ButtonPausePressed.bmp";

	buttonImagePausePressed.style.position = "absolute";

	buttonImagePausePressed.style.left = movieborderSpaceLeft + buttonWidth + "px";

	buttonImagePausePressed.style.top = movieborderSpaceTop + movieHeight + "px";

	buttonImagePausePressed.style.width = buttonWidth + "px";

	buttonImagePausePressed.style.height = buttonHeight + "px";

	buttonImagePausePressed.style.display = 'none';

	buttonImagePausePressed.style.zIndex = 0;

	obj.appendChild(buttonImagePausePressed);



	// Pause button mouse event handling

	buttonImagePause.onmousedown = handleMouseDownPlayPause;

	buttonImagePause.onmouseup = handleMouseUpPlayPause;

	buttonImagePause.onmouseout = handleMouseUpPlayPause;

	// Button space setup

	buttonImageSpace.src = "ButtonSpace.bmp";

	buttonImageSpace.style.position = "absolute";

	buttonImageSpace.style.left = movieborderSpaceLeft + (buttonWidth * 2) + "px";

	buttonImageSpace.style.top = movieborderSpaceTop + movieHeight + "px";

	buttonImageSpace.style.width = buttonWidth + "px";

	buttonImageSpace.style.height = buttonHeight + "px";

	buttonImageSpace.style.display = 'block';

	buttonImageSpace.style.zIndex = 0;

	obj.appendChild(buttonImageSpace);

	// Displays first image since sliderPos = 0

	updateImageAndSlider();

}

function setOpacity(element, opacity)

{

	element.style.filter = "alpha(opacity=" + Math.round(opacity*100) + ")";

	element.style.opacity = opacity;

}

function getMouseXY(e)

{

	if (e.pageX)

	{

		mouseX = e.pageX;

		mouseY = e.pageY;

	}

	else

	{

		mouseX = event.clientX + document.documentElement.scrollLeft;

		mouseY = event.clientY + document.documentElement.scrollTop;

	}  

	if (mouseX < 0){mouseX = 0;}

	if (mouseY < 0){mouseY = 0;} 

}

function updateSliderPositionFromPos()

{

	if (document.selection) {

		// AGS: document.selection is IE-only

		//document.selection.empty();

	}

	buttonPos = mouseX - leftmargin - (buttonWidth * 3);

	if (buttonPos > sliderWidth) 

	{

		buttonPos = sliderWidth;

	}

	if (buttonPos < 0)

	{

		buttonPos = 0;

	}



	updateImageAndSlider();

}

function updateSliderPositionFromTime()

{

	if (isPlaying == true)

	{

		updateImageAndSlider();

		t=setTimeout("updateSliderPositionFromTime()", movieSpeed);

		buttonPos ++;

	}

}

function handleMouseUpSlider(e)

{

	if (isSliding == true)

	{

		isSliding = false;



		SetPaused();

	}

}

function handleMouseDownSlider(e)

{

	if (!e) { e = window.event; }

	getMouseXY(e);



	isSliding = true;

	isPlaying = false;



	updateSliderPositionFromPos();

}

function handleMouseMoveSlider(e)

{

	if (!e) { e = window.event; }

	getMouseXY(e);



	if (isSliding == true)

	{

		updateSliderPositionFromPos();

	}

}

function updateImageAndSlider()

{

	if (isSliding == true)

	{

		buttonPos = mouseX - leftmargin - (buttonWidth * 3);

	}



	movieIndex =  Math.floor (numImages * (buttonPos/sliderWidth));

	if (buttonPos > sliderWidth) 

	{

		buttonPos = sliderWidth;

		SetPaused();

	}

	if (buttonPos < 0)

	{

		buttonPos = 0;

		SetPaused();

	}



	if (movieIndex >= numImages) movieIndex = numImages -1;



	if (movieIndex < 0) movieIndex = 0;

	buttonImage.style.left = Math.floor (movieborderSpaceLeft + (buttonWidth * 3) + buttonPos - (buttonWidth/2)) + "px";



	for (var i = 0; i < numImages; i++)

	{

		movieImageArray[i].style.display = 'none';

	}



	movieImageArray[movieIndex].style.display = 'block';

}

function handleMouseDownPlayPause(e)

{

	mouseDown = true;



	if (isPlaying == false)

	{

		buttonImagePlay.style.display = 'none';

		buttonImagePlayPressed.style.display = 'block';

		buttonImagePause.style.display = 'none';

		buttonImagePausePressed.style.display = 'none';

	}

	else

	{

		buttonImagePlay.style.display = 'none';

		buttonImagePlayPressed.style.display = 'none';

		buttonImagePause.style.display = 'none';

		buttonImagePausePressed.style.display = 'block';

	}

}

function handleMouseUpPlayPause(e)

{

	if (mouseDown == true)

	{

		if (isPlaying == true)

		{

			SetPaused();

		}

		else

		{

			SetPlaying();



			t=setTimeout("updateSliderPositionFromTime()", movieSpeed);

		}

		mouseDown = false;

	}

}

function handleMouseDownStop(e)

{

	buttonImageStop.style.display = 'none';

	buttonImageStopPressed.style.display = 'block';



	mouseDownStop = true;

}

function handleMouseUpStop(e)

{

	if (mouseDownStop == true)

	{

		mouseDownStop = false;



		SetStopped();

		updateImageAndSlider();

	}

}

function SetPlaying()

{

	buttonImagePlay.style.display = 'none';

	buttonImagePlayPressed.style.display = 'none';

	buttonImagePause.style.display = 'block';

	buttonImagePausePressed.style.display = 'none';



	isPlaying = true;

}

function SetStopped()

{

	buttonImageStop.style.display = 'block';

	buttonImageStopPressed.style.display = 'none';



	SetPaused();



	buttonPos = 0;



	updateImageAndSlider();

}

function SetPaused()

{

	isPlaying = false;

	buttonImagePlay.style.display = 'block';

	buttonImagePlayPressed.style.display = 'none';

	buttonImagePause.style.display = 'none';

	buttonImagePausePressed.style.display = 'none';

}

//Declaring new variables

//- - - - - - - - - - - - - - - - - - - - - - -

// Aspect ratio

var oldHeight = 0;

var oldWidth = 0;

var newHeight = 0;

var newWidth = 0;

var newTop = 0;

var newLeft = 0;

var currentImage = 0;

//Add a new function

//- - - - - - - - - - - - - - - - - -

function SetupImage(imageWidth, imageHeight, leftmargin, topmargin, sliderWidth)

{

	// Can't simply use width and height parameters of bitmap since this returns incorrect values.

	// No explanation why this is the case but this fudging allows the true width and height to be calculated.

	image = currentImage;



	image.style.display = "block";

	document.body.appendChild(image);



	oldHeight = 0;

	oldWidth = 0;



	currentImage.removeAttribute("width");

	image.removeAttribute("height");



	oldHeight = image.clientHeight;

	oldWidth = image.clientWidth;

	// Landscape

	if (oldWidth >= oldHeight)

	{

		if (oldWidth < imageWidth) // Don't scale image as it's small enough to fit.

		{

			newWidth = oldWidth;

			newLeft = Math.floor((imageWidth - newWidth) / 2);;

		}

		else

		{

			newWidth = imageWidth;

			newLeft = 0;

		}

		newHeight = Math.floor (newWidth *(oldHeight / oldWidth));

		newTop = Math.floor((imageHeight - newHeight) / 2); 

	}

	// Portrait

	else

	{

		if (oldHeight < imageHeight) // Don't scale image as it's small enough to fit.

		{

			newHeight = oldHeight;

			newTop = Math.floor((imageHeight - newHeight) / 2);;

		}

		else

		{

			newHeight = imageHeight;

			newTop = 0;

		}

		newWidth = Math.floor (newHeight *(oldWidth / oldHeight));

		newLeft = Math.floor((imageWidth - newWidth) / 2); 

	}



	image.style.position = "absolute";

	image.style.left = movieborderSpaceLeft + sliderWidth + newLeft + "px";

	image.style.top = movieborderSpaceTop + newTop + "px";

	image.style.width = newWidth + "px";

	image.style.height = newHeight + "px";



	image.style.display = "none";

	image.style.zIndex = 0;       

}

function verticalSlider()

{

	// public function

	this.setup = setup;

	function setup(lmargin, tmargin, imageCount, srcName, srcExt, containerDivName)

	{

		var leftmargin = lmargin;

		var topmargin = tmargin;

		var numImages = imageCount;

		var sliderWidth = 32;

		var sliderHeight = 230;

		var buttonWidth = 32;

		var buttonHeight = 16;

		var isHorizontal = true;

		var sourceName = srcName;

		var sourceExt = srcExt;

		//Slider button

		var buttonPos = 0;

		var isSliding = false;

		var isHorizontal = false;

		//Mouse position

		var mouseX = 0;

		var mouseY = 0;

		var numImages = imageCount;

		var imageWidth = 230;

		var imageHeight = 230;

		var borderSpaceLeft = 2;

		var borderSpaceTop = 40;

		var sliderImage;

		var imageArray = new Array();

		obj = document.getElementById(containerDivName);

		if(obj == null)

		{

			obj = document.body;

		}

		// Create and load array of Sketchup images

		for (i = 0; i < numImages; i++) {

			imageArray[i] = new Image();

			//imageArray[i].className = "hideincombined";

			currentImage = imageArray[i];

			//imageArray[i].onload = function() { SetupImage (imageWidth, imageHeight, leftmargin, topmargin, sliderWidth) };

			imageArray[i].src = srcName + i + srcExt;

			imageArray[i].style.position = "absolute"

			imageArray[i].style.left = borderSpaceLeft + sliderWidth + "px";

			imageArray[i].style.top = borderSpaceTop + "px";

			imageArray[i].style.width = imageWidth + "px";

			imageArray[i].style.height = imageHeight + "px";

			imageArray[i].style.display = "none";

			imageArray[i].style.zIndex = 0;

			obj.appendChild(imageArray[i]);

		}

		sliderImage = new Image();

		// Slider bar setup

		//sliderImage.className = "hide";

		sliderImage.src = "BarVertical.bmp";

		sliderImage.style.position = "absolute";

		sliderImage.style.left = borderSpaceLeft + "px";

		sliderImage.style.top = borderSpaceTop + "px";

		sliderImage.style.width = sliderWidth + "px";

		sliderImage.style.height = sliderHeight + "px";

		sliderImage.style.display = "block";

		sliderImage.style.zIndex = 0;

		obj.appendChild(sliderImage);

		// Transparent sheet to capture mouse events on slider

		sheetSlider = document.createElement("DIV");

		// Slider bar sheet setup

		//sheetSlider.id = "sheet";

		//sheetSlider.className = "hide";

		sheetSlider.style.position = "absolute";

		sheetSlider.style.left = borderSpaceLeft + "px";

		sheetSlider.style.top = borderSpaceTop + "px";

		sheetSlider.style.width = sliderWidth + "px";

		sheetSlider.style.height = sliderHeight + "px";

		sheetSlider.style.display = "block";

		sheetSlider.style.zIndex = 2;

		sheetSlider.style.backgroundColor = "FFFFFF";

		setOpacity(sheetSlider, 0.0);// Makes sheet invisible

		obj.appendChild(sheetSlider);



		// Slider bar mouse event handling

		sheetSlider.onmousedown = handleMouseDownSlider;

		sheetSlider.onmouseup = handleMouseUp;

		sheetSlider.onmousemove = handleMouseMove;

		// Document body mouse event handling

		document.body.onmousedown = handleMouseDownSlider;

		document.body.onmousemove = handleMouseMove;

		document.body.onmouseup = handleMouseUp;

		var buttonImage = new Image();

		// Slider button setup

		//buttonImage.className = "hide";

		buttonImage.src = "Button.png";

		buttonImage.style.position = "absolute";

		buttonImage.style.left = borderSpaceLeft + "px";

		buttonImage.style.top = Math.floor (borderSpaceTop + buttonPos - (buttonHeight/2)) + "px";

		buttonImage.style.width = buttonWidth + "px";

		buttonImage.style.height = buttonHeight + "px";

		buttonImage.style.display = 'block';

		buttonImage.style.zIndex = 1;

		obj.appendChild(buttonImage);

		// Displays first image since sliderPos = 0

		updateImage(sliderHeight);

		function setOpacity(element, opacity)

		{

			element.style.filter = "alpha(opacity=" + Math.round(opacity*100) + ")";

			element.style.opacity = opacity;

		}

		function handleMouseMove(e)

		{

			if (!e) { e = window.event; }

			getMouseXY(e);



			if ((isSliding == true) && (isHorizontal == true))

			{

				updateSliderPosition(mouseX, sliderWidth, leftmargin);

				updateImage(sliderWidth);

			}

			else if (isSliding == true)

			{

				updateSliderPosition(mouseY, sliderHeight, topmargin);

				updateImage(sliderHeight);

			}

		}

		function handleMouseUp(e)

		{

			isSliding = false;

		}

		function handleMouseDownSlider(e)

		{

			if (!e) { e = window.event; }

			getMouseXY(e);

			isSliding = true;



			if(isHorizontal == true)

			{

				updateSliderPosition(mouseX, sliderWidth, leftmargin);

				updateImage(sliderWidth);

			}

			else

			{

				updateSliderPosition(mouseY, sliderHeight, topmargin);

				updateImage(sliderHeight);

			}

		}

		function getMouseXY(e)

		{

			if (e.pageX)

			{

				mouseX = e.pageX;

				mouseY = e.pageY;

			}

			else

			{

				mouseX = event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;

				mouseY = event.clientY + document.body.scrollTop + document.documentElement.scrollTop;

			}  

			if (mouseX < 0){mouseX = 0;}

			if (mouseY < 0){mouseY = 0;} 

		}

		function updateSliderPosition(mouse, slider, margin)

		{

			if (document.selection) {

				// AGS: document.selection is IE-only

				//document.selection.empty();

			}

			buttonPos = mouse - margin;

			if (buttonPos > slider) 

			{

				buttonPos = slider;

			}

			if (buttonPos < 0)

			{

				buttonPos = 0;

			}



			if(isHorizontal == true)

			{

				buttonImage.style.left = Math.floor (borderSpaceLeft + buttonPos - (buttonWidth/2)) + "px";

			}

			else

			{

				buttonImage.style.top = Math.floor (borderSpaceTop + buttonPos - (buttonHeight/2)) + "px";

			}

		}

		function updateImage(slider)

		{

			var newPos = Math.floor(numImages * (buttonPos/slider));

			if (newPos >= numImages)

			{

				newPos = newPos - 1;

			}

			for (var i = 0; i < numImages; i++)

			{

				imageArray[i].style.display = 'none';

			}

			imageArray[newPos].style.display = 'block';

		}

	}

}

function horizontalSlider() 

{

	// public function

	this.setup = setup;

	function setup(lmargin, tmargin, imageCount, srcName, srcExt, containerDivName)

	{

		var leftmargin =  lmargin;

		var topmargin = tmargin;

		var numImages = imageCount;// should be 36

		var sliderWidth = 230;

		var sliderHeight = 32;

		var isHorizontal = true;

		var sourceName = srcName;

		var sourceExt = srcExt;

		//Slider button

		var buttonWidth = 16;

		var buttonHeight = 32;

		var buttonPos = 0;

		var isSliding = false;

		var isHorizontal = true;

		//Mouse position

		var mouseX = 0;

		var mouseY = 0;

		//var numImages = 36;

		var imageWidth = 230;

		var imageHeight = 230;

		var borderSpaceLeft = 25;

		var borderSpaceTop = 25;

		var sliderImage;

		obj = document.getElementById(containerDivName);

		if(obj == null)

		{

			obj = document.body;

		}

		var imageArray = new Array();

		// Create and load array of Sketchup images

		for (i = 0; i < numImages; i++) {

			imageArray[i] = new Image();

			imageArray[i].id = sourceName + i;

			imageArray[i].src = sourceName + i + sourceExt;

			imageArray[i].style.position = "absolute"

			imageArray[i].style.left = borderSpaceLeft + "px";

			imageArray[i].style.top = borderSpaceTop + "px";

			imageArray[i].style.width = imageWidth + "px";

			imageArray[i].style.height = imageHeight + "px";

			imageArray[i].style.display = "none";

			imageArray[i].style.zIndex = 0;

			obj.appendChild(imageArray[i]);

		}



		sliderImage = new Image();

		// Slider bar setup

		sliderImage.src = "BarHorizontal.bmp";

		sliderImage.style.position = "absolute";

		sliderImage.style.left = borderSpaceLeft + "px";

		sliderImage.style.top = borderSpaceTop + imageHeight + "px";

		sliderImage.style.width = sliderWidth + "px";

		sliderImage.style.height = sliderHeight + "px";

		sliderImage.style.display = "block";

		sliderImage.style.zIndex = 0;

		obj.appendChild(sliderImage);

		// Transparent sheet to capture mouse events on slider

		sheetSlider = document.createElement("DIV");



		// Slider bar sheet setup

		// sheetSlider.id = "sheet";

		sheetSlider.style.position = "absolute";

		sheetSlider.style.left = borderSpaceLeft + "px";

		sheetSlider.style.top = borderSpaceTop + imageHeight + "px";

		sheetSlider.style.width = sliderWidth + "px";

		sheetSlider.style.height = sliderHeight + "px";

		sheetSlider.style.display = "block";

		sheetSlider.style.zIndex = 2;

		sheetSlider.style.backgroundColor = "FFFFFF";

		setOpacity(sheetSlider, 0.0);// Makes sheet invisible

		obj.appendChild(sheetSlider);



		// Slider bar mouse event handling

		sheetSlider.onmousedown = handleMouseDownSlider;

		sheetSlider.onmouseup = handleMouseUp;

		sheetSlider.onmousemove = handleMouseMove;

		// Document body mouse event handling

		document.body.onmousedown = handleMouseDownSlider;

		document.body.onmousemove = handleMouseMove;

		document.body.onmouseup = handleMouseUp;

		var buttonImage = new Image();

		// Slider button setup

		buttonImage.src = "ButtonH.png";

		buttonImage.style.position = "absolute";

		buttonImage.style.left = Math.floor (borderSpaceLeft + buttonPos - (buttonWidth/2)) + "px";

		buttonImage.style.top = borderSpaceTop + imageHeight + "px";

		buttonImage.style.width = buttonWidth + "px";

		buttonImage.style.height = buttonHeight + "px";

		buttonImage.style.display = 'block';

		buttonImage.style.zIndex = 1;

		obj.appendChild(buttonImage);

		// Displays first image since sliderPos = 0

		updateImage(sliderWidth);

		function setOpacity(element, opacity)

		{

			element.style.filter = "alpha(opacity=" + Math.round(opacity*100) + ")";

			element.style.opacity = opacity;

		}

		function handleMouseMove(e)

		{

			if (!e) { e = window.event; }

			getMouseXY(e);



			if ((isSliding == true) && (isHorizontal == true))

			{

				updateSliderPosition(mouseX, sliderWidth, leftmargin);

				updateImage(sliderWidth);

			}

			else if (isSliding == true)

			{

				updateSliderPosition(mouseY, sliderHeight, topmargin);

				updateImage(sliderHeight);

			}

		}

		function handleMouseUp(e)

		{

			isSliding = false;

		}

		function handleMouseDownSlider(e)

		{

			if (!e) { e = window.event; }

			getMouseXY(e);

			isSliding = true;



			if(isHorizontal == true)

			{

				updateSliderPosition(mouseX, sliderWidth, leftmargin);

				updateImage(sliderWidth);

			}

			else

			{

				updateSliderPosition(mouseY, sliderHeight, topmargin);

				updateImage(sliderHeight);

			}

		}

		function getMouseXY(e)

		{

			if (e.pageX)

			{

				mouseX = e.pageX;

				mouseY = e.pageY;

			}

			else

			{

				mouseX = event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;

				mouseY = event.clientY + document.body.scrollTop + document.documentElement.scrollTop;

			}  

			if (mouseX < 0){mouseX = 0;}

			if (mouseY < 0){mouseY = 0;} 

		}

		function updateSliderPosition(mouse, slider, margin)

		{

			if (document.selection) {

				// AGS: document.selection is IE-only

				//document.selection.empty();

			}

			buttonPos = mouse - margin;

			if (buttonPos > slider) 

			{

				buttonPos = slider;

			}

			if (buttonPos < 0)

			{

				buttonPos = 0;

			}



			if(isHorizontal == true)

			{

				buttonImage.style.left = Math.floor (borderSpaceLeft  + buttonPos - (buttonWidth/2)) + "px";

			}

			else

			{

				buttonImage.style.top = Math.floor (borderSpaceTop + buttonPos - (buttonHeight/2)) + "px";

			}

		}

		function updateImage(slider)

		{

			var newPos = Math.floor(numImages * (buttonPos/slider));

			if (newPos >= numImages)

			{

				newPos = newPos - 1;

			}

			for (var i = 0; i < numImages; i++)

			{

				imageArray[i].style.display = 'none';

			}

			imageArray[newPos].style.display = 'block';

		}

	}

}
