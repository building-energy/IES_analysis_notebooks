function FilterTkComfortOccupiedTable() {
	var skiprowsstart = 4;
	var skiprowsend = 2;	
	var maxtempcol = 1, mintempcol = 2, maxhumidcol = 3, minhumidcol = 4, maxppdcol = 5, minppdcol = 6;

	tableFormatter.filtertablecolumn("tkenergycarboncomfortoccupied", "comfortOccMaxTemp", maxtempcol, skiprowsstart, skiprowsend, "editred");
	tableFormatter.filtertablecolumn("tkenergycarboncomfortoccupied", "comfortOccMinTemp", mintempcol, skiprowsstart, skiprowsend, "editred");
	tableFormatter.filtertablecolumn("tkenergycarboncomfortoccupied", "comfortOccMaxHumid", maxhumidcol, skiprowsstart, skiprowsend, "editred");
	tableFormatter.filtertablecolumn("tkenergycarboncomfortoccupied", "comfortOccMinHumid", minhumidcol, skiprowsstart, skiprowsend, "editred");
	tableFormatter.filtertablecolumn("tkenergycarboncomfortoccupied", "comfortOccMaxPPD", maxppdcol, skiprowsstart, skiprowsend, "editred");
	tableFormatter.filtertablecolumn("tkenergycarboncomfortoccupied", "comfortOccMinPPD", minppdcol, skiprowsstart, skiprowsend, "editred");
}

function FilterTkPeakRoomLoadsTable() {
	var skiprowsstart = 4;
	var skiprowsend = 2;	
	var maxsensheatcol = 1, maxsenscooltcol = 2, maxhumidcol = 3, maxdehumidcol = 4, maxinternalgaincol = 5, maxeng1col = 6, maxeng2col = 7;
	tableFormatter.filtertablecolumn("tkenergycarbonpeakroomloads", "peakRoomMaxSensHeat", maxsensheatcol, skiprowsstart, skiprowsend, "editred");
	tableFormatter.filtertablecolumn("tkenergycarbonpeakroomloads", "peakRoomMaxSensCool", maxsenscooltcol, skiprowsstart, skiprowsend, "editred");
	tableFormatter.filtertablecolumn("tkenergycarbonpeakroomloads", "peakRoomMaxHumid", maxhumidcol, skiprowsstart, skiprowsend, "editred");
	tableFormatter.filtertablecolumn("tkenergycarbonpeakroomloads", "peakRoomMaxDehumid", maxdehumidcol, skiprowsstart, skiprowsend, "editred");
	tableFormatter.filtertablecolumn("tkenergycarbonpeakroomloads", "peakRoomMaxInternalGains", maxinternalgaincol, skiprowsstart, skiprowsend, "editred");
	tableFormatter.filtertablecolumn("tkenergycarbonpeakroomloads", "peakRoomMaxEngCheck1", maxeng1col, skiprowsstart, skiprowsend, "editred");
	tableFormatter.filtertablecolumn("tkenergycarbonpeakroomloads", "peakRoomMaxEngCheck2", maxeng2col, skiprowsstart, skiprowsend, "editred");
}

function InitEnergyTables() {

	// Highlight current simulation
	tableFormatter.highlightLastRow("apSimHistory", 2, "greenrow");
	// Highlight hi/lo of the carbon emissions
	for(i = 1; i < 4; i++)
	{
		tableFormatter.highlightMaxCell("apCarbonEmissions", i, 2, 2, "cellhi");
		tableFormatter.highlightMinCell("apCarbonEmissions", i, 2, 2, "celllo");
	}

	// Highlight the total row
	tableFormatter.highlightRow("apCarbonEmissions", 14, "greenrow");

	FilterTkComfortOccupiedTable();
	FilterTkPeakRoomLoadsTable();

}
