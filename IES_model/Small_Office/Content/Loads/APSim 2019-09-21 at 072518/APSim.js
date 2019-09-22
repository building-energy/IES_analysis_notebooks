function filterComfortOccupied() {
	var skiprowsstart = 4;
	var skiprowsend = 2;	
	var maxPPDColumn = 5;
	tableFormatter.filtertablecolumn("comfortTableOccupied", "maxPPDEditFieldOccupied", maxPPDColumn, skiprowsstart, skiprowsend, "editred");
}

function filterComfortFullDay() {
	var skiprowsstart = 4;
	var skiprowsend = 2;	
	var maxPPDColumn = 5;
	tableFormatter.filtertablecolumn("comfortTableFullDay", "maxPPDEditFullDay", maxPPDColumn, skiprowsstart, skiprowsend, "editred");
}

function filterPeakRoomLoads() {
	var skiprowsstart = 4;
	var skiprowsend = 2;	
	var maxEngCheckColumn = 6;
	tableFormatter.filtertablecolumn("peakTableRoomLoads", "maxEngCheck", maxEngCheckColumn, skiprowsstart, skiprowsend, "editred");
}

function InitTables() {

	standardistaTableSorting.init();	

	// Highlight hi/lo of the energy summary
	for(i = 1; i < 6; i++)
	{
	
		tableFormatter.highlightMaxCells("buildingSystemEnergy", i, 4, 3, "cellhi");
		tableFormatter.highlightMinCells("buildingSystemEnergy", i, 4, 3, "celllo");
	}
	// Highlight hi/lo of the carbon 
	for(i = 1; i < 4; i++)
	{
	
		tableFormatter.highlightMaxCells("buildingSystemCarbon", i, 4, 3, "cellhi");
		tableFormatter.highlightMinCells("buildingSystemCarbon", i, 4, 3, "celllo");
	}

	filterComfortOccupied();
	filterComfortFullDay();
	filterPeakRoomLoads();
}

addEvent(window, 'load', InitTables);