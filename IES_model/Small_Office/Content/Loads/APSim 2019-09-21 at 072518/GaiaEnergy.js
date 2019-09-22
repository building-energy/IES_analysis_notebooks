function InitEnergyReportTables() {
	InitEnergyTables();
	standardistaTableSorting.init();
}

addEvent(window, 'load', InitEnergyReportTables)