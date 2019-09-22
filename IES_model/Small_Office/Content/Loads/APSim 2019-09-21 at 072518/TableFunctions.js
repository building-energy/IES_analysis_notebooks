var jQueryScriptOutputted = false;

var tableCell;
var isFinished = 0;

initJQuery();

function initJQuery()
{
  $.fn.rotateTableCellContent = function (options)
  {
    /* Vertical Text */

    var cssClass = ((options) ? options.className : false) || "vertical";

    var cellsToRotate = $('.' + cssClass, this);

    var betterCells = [];
    cellsToRotate.each(function ()
    {

      if ($(this)[0].firstChild != null) // RH: Check for empty div
      {
        // RH: Retain previous table cell for special case of GM Points
        if ($(this)[0].firstChild.innerHTML != "Minimum 20 Points")
        {
          // RH: Get the table cell so we can retrieve its height and width later
          tableCell = $(this);
          while (!(tableCell.is('td') || tableCell.is('html') || tableCell.is('th')))
          {
            tableCell = tableCell.parent();
          }
        }

        var cellWidth = tableCell.width();
        tableCell.width('10000%');

        //RH: Make sure we're rotating the text itself and not a div/cell etc
        var cell = $(this)[0].firstChild
        , newText = cell.innerHTML
        , height = cell.offsetHeight + 1
        , width = cell.offsetWidth + 1
        , newDiv = $('<div>', { height: height, width: width });

        //RH: If there are multiple spans
        if ($(this)[0].children.length > 1)
        {
          newText = "";
          width = 0;
          for (i = 0; i < $(this)[0].children.length; i++)
          {
            newText += $(this)[0].children[i].innerHTML;
            width += $(this)[0].children[i].offsetWidth + 1;
          }
        }

        tableCell.width(cellWidth);

        // RH: Only reverse height and width if the orignal height is less than the orignal width
        if (height < width)
        {
          newDiv = $('<div>', { height: width, width: height });
        }

        var newInnerDiv = $('<div>', { html: newText, 'class': 'rotated' });

        newDiv.append(newInnerDiv);

        betterCells.push(newDiv);
      }
    });

    cellsToRotate.each(function (i)
    {
      $(this).html(betterCells[i]);
    });
  };
};

$(function ()
{
  try
  {
    $('table').rotateTableCellContent({ className: 'verticaltext' });
    $('table').rotateTableCellContent({ className: 'verticaltextsummary' });
    $('table').rotateTableCellContent({ className: 'verticaltextbe' });
    $('table').rotateTableCellContent({ className: 'verticaltext2' });
    $('table').rotateTableCellContent({ className: 'verticaltext3' });
    $('table').rotateTableCellContent({ className: 'verticaltext4' });
    $('table').rotateTableCellContent({ className: 'verticaltext5' });
    $('table').rotateTableCellContent({ className: 'verticaltext6' });
    $('table').rotateTableCellContent({ className: 'verticaltext7' });
    $('table').rotateTableCellContent({ className: 'verticaltext8' });
    $('table').rotateTableCellContent({ className: 'verticaltextgmis' });
    $('table').rotateTableCellContent({ className: 'verticaltextgmis2' });
    $('table').rotateTableCellContent({ className: 'verticaltextettv' });
    $('table').rotateTableCellContent({ className: 'verticaltextGM' });
    $('table').rotateTableCellContent({ className: 'verticaltextlong' });
    $('table').rotateTableCellContent({ className: 'verticaltexttall' });
    $('table').rotateTableCellContent({ className: 'verticaltexttall2' });
    $('table').rotateTableCellContent({ className: 'verticaltexttall3' });
    $('table').rotateTableCellContent({ className: 'verticaltexttall4' });
    $('table').rotateTableCellContent({ className: 'verticaltextLEEDtall' });
    isFinished = 1;
  }
  catch (err)
  {
    isFinished = -1;
  }
});

function checkFinished()
{
  return isFinished;
}

var llHelper = {

  convertToFloat: function (stringVal)
  {

    var result;

    var convert = stringVal.replace(/,/g, "");// locale specific is better - once you find a way then replace this

    result = parseFloat(convert);

    return result;

  }



}



var tableFormatter = {



  /**

* Highlight the max value of a column

* tableid - which table

* column - which column

* skipStart - how many rows to skip at start

* skipEnd - how many rows to skip at the end

* cssClass - what CSS class to change the cell to

**/

  highlightMaxCell: function (tableid, column, skipStart, skipEnd, cssClass)
  {

    var table = document.getElementById(tableid);

    if (table != null)
    {

      var rowLength = table.rows.length - skipEnd;

      var initialCell = table.rows[skipStart].cells[column]

      var maxCell = initialCell, maxValue = llHelper.convertToFloat(initialCell.firstChild.innerHTML);

      for (var r = skipStart; r < (rowLength) ; r++)
      {

        var element = table.rows[r].cells[column];

        if (element != null)
        {

          var value = llHelper.convertToFloat(element.firstChild.innerHTML);

          if (value > maxValue)
          {

            maxValue = value;

            maxCell = element;

          }

        }

      }

      maxCell.className = cssClass;// now highlight the cell

    }

  },



  /**

* Highlight the max values of a column

* tableid - which table

* column - which column

* skipStart - how many rows to skip at start

* skipEnd - how many rows to skip at the end

* cssClass - what CSS class to change the cell to

**/

  highlightMaxCells: function (tableid, column, skipStart, skipEnd, cssClass)
  {

    var table = document.getElementById(tableid);

    if (table != null)
    {

      var rowLength = table.rows.length - skipEnd;

      var initialCell = table.rows[skipStart].cells[column]

      var maxValue = "notset";

      // Get max value

      for (var r = skipStart; r < (rowLength) ; r++)
      {

        var element = table.rows[r].cells[column];

        if (element != null)
        {

          var value = llHelper.convertToFloat(element.firstChild.innerHTML);

          if (isNaN(value) == false)
          {

            if (maxValue == "notset")
            {

              maxValue = value;

            }

            else if (value > maxValue)
            {

              maxValue = value;

            }

          }

        }

      }

      // now highlight all cells with that value

      for (var r = skipStart; r < (rowLength) ; r++)
      {

        var element = table.rows[r].cells[column];

        if (element != null)
        {

          var value = llHelper.convertToFloat(element.firstChild.innerHTML);

          if ((isNaN(value) == false) && (value == maxValue))
          {

            element.className = cssClass;// now highlight the cell

          }

        }

      }

    }

  },



  /**

* Highlight the min value of a column

* tableid - which table

* column - which column

* skipStart - how many rows to skip at start

* skipEnd - how many rows to skip at the end

* cssClass - what CSS class to change the cell to

**/

  highlightMinCell: function (tableid, column, skipStart, skipEnd, cssClass)
  {

    var table = document.getElementById(tableid);

    if (table != null)
    {

      var rowLength = table.rows.length - skipEnd;

      var initialCell = table.rows[skipStart].cells[column]

      var minCell = initialCell, minValue = llHelper.convertToFloat(initialCell.firstChild.innerHTML);

      for (var r = skipStart; r < (rowLength) ; r++)
      {

        var element = table.rows[r].cells[column];

        if (element != null)
        {

          var it = element.firstChild.innerHTML;

          var value = llHelper.convertToFloat(it);

          if (value < minValue)
          {

            minValue = value;

            minCell = element;

          }

        }

      }

      minCell.className = cssClass;// now highlight the cell

    }

  },



  /**

* Highlight the min values of a column

* tableid - which table

* column - which column

* skipStart - how many rows to skip at start

* skipEnd - how many rows to skip at the end

* cssClass - what CSS class to change the cell to

**/

  highlightMinCells: function (tableid, column, skipStart, skipEnd, cssClass)
  {

    var table = document.getElementById(tableid);

    if (table != null)
    {

      var rowLength = table.rows.length - skipEnd;

      var minValue = "notset";

      // Get min value

      for (var r = skipStart; r < (rowLength) ; r++)
      {

        var element = table.rows[r].cells[column];

        if (element != null)
        {

          var it = element.firstChild.innerHTML;

          var value = llHelper.convertToFloat(it);



          if (isNaN(value) == false)
          {

            if (minValue == "notset")
            {

              minValue = value;

            }

            else if (value < minValue)
            {

              minValue = value;

            }

          }

        }

      }

      // now highlight all cells with that value

      for (var r = skipStart; r < (rowLength) ; r++)
      {

        var element = table.rows[r].cells[column];

        if (element != null)
        {

          var it = element.firstChild.innerHTML;

          var value = llHelper.convertToFloat(it);

          if ((isNaN(value) == false) && (value == minValue))
          {

            element.className = cssClass;// now highlight the cell

          }

        }

      }

    }

  },



  /**

* Highlight the whole row 

* tableid - which table

* row - which row

* cssClass - what CSS class to change the cell to

**/

  highlightRow: function (tableid, row, cssClass)
  {

    var table = document.getElementById(tableid);

    if (table != null)
    {

      var row = table.rows[row];

      if (row != null)
      {

        row.className = cssClass;

      }

    }

  },



  /**

* Highlight the last rows in table whole row 

* tableid - which table

* skipEnd - dont touch these rows

* cssClass - what CSS class to change the cell to

**/

  highlightLastRow: function (tableid, skipEnd, cssClass)
  {

    var table = document.getElementById(tableid);

    if (table != null)
    {

      var numberOfRows = table.rows.length;

      var row = table.rows[numberOfRows - skipEnd];

      if (row != null)
      {

        row.className = cssClass;

      }

    }

  },



  /**

* Highlight the whole row 

* tableid - which table

* editid - id of edit value

* column - column number

* skipstart - how many rows to skip at start

* skipend - how many to skip from end

* cssName - class to change to if above threshold 

**/

  filtertablecolumn: function (tableid, editid, column, skipstart, skipend, cssName)
  {



    var table = document.getElementById(tableid);

    if (table != null)
    {

      var element;

      var max = document.getElementById(editid);

      if (max != null)
      {

        var maxValue = llHelper.convertToFloat(max.value);

        var rowLength = table.rows.length - skipend;

        var rowStart = skipstart;



        for (var r = rowStart; r < (rowLength) ; r++)
        {

          var row = table.rows[r];

          element = row.cells[column];

          element = table.rows[r].cells[column];

          if (element.firstChild) // RH: Added conditional to prevent error on element with no child

          {

            s = llHelper.convertToFloat(element.firstChild.innerHTML);

          }

          if (maxValue >= 0)
          {

            if (s >= maxValue)
            {

              element.className = cssName;

            }

            else
            {

              element.className = "";

            }

          }

          else
          {

            if (s <= maxValue)
            {

              element.className = cssName;

            }

            else
            {

              element.className = "";

            }

          }

        }



      }

    }

  }

}





function addEvent(element, type, handler)
{

  // assign each event handler a unique ID

  if (!handler.$$guid) handler.$$guid = addEvent.guid++;

  // create a hash table of event types for the element

  if (!element.events) element.events = {};

  // create a hash table of event handlers for each element/event pair

  var handlers = element.events[type];

  if (!handlers)
  {

    handlers = element.events[type] = {};

    // store the existing event handler (if there is one)

    if (element["on" + type])
    {

      handlers[0] = element["on" + type];

    }

  }

  // store the event handler in the hash table

  handlers[handler.$$guid] = handler;

  // assign a global event handler to do all the work

  element["on" + type] = handleEvent;

};

// a counter used to create unique IDs

addEvent.guid = 1;



function removeEvent(element, type, handler)
{

  // delete the event handler from the hash table

  if (element.events && element.events[type])
  {

    delete element.events[type][handler.$$guid];

  }

};



function handleEvent(event)
{

  var returnValue = true;

  // grab the event object (IE uses a global event object)

  event = event || fixEvent(window.event);

  // get a reference to the hash table of event handlers

  var handlers = this.events[event.type];

  // execute each event handler

  for (var i in handlers)
  {

    this.$$handleEvent = handlers[i];

    if (this.$$handleEvent(event) === false)
    {

      returnValue = false;

    }

  }

  return returnValue;

};



function fixEvent(event)
{

  // add W3C standard event methods

  event.preventDefault = fixEvent.preventDefault;

  event.stopPropagation = fixEvent.stopPropagation;

  return event;

};

fixEvent.preventDefault = function ()
{

  this.returnValue = false;

};

fixEvent.stopPropagation = function ()
{

  this.cancelBubble = true;

};



// end from Dean Edwards



function createElement(element)
{

  if (typeof document.createElementNS != 'undefined')
  {

    return document.createElementNS('http://www.w3.org/1999/xhtml', element);

  }

  if (typeof document.createElement != 'undefined')
  {

    return document.createElement(element);

  }

  return false;

}



function getEventTarget(e)
{

  var targ;

  if (!e)
  {

    e = window.event;

  }

  if (e.target)
  {

    targ = e.target;

  } else if (e.srcElement)
  {

    targ = e.srcElement;

  }

  if (targ.nodeType == 3)
  { // defeat Safari bug

    targ = targ.parentNode;

  }



  return targ;

}



/**

* Written by Neil Crosby. 

* http://www.workingwith.me.uk/

*

* Use this wherever you want, but please keep this comment at the top of this file.

*

* Copyright (c) 2006 Neil Crosby

*

* Permission is hereby granted, free of charge, to any person obtaining a copy 

* of this software and associated documentation files (the "Software"), to deal 

* in the Software without restriction, including without limitation the rights

* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell 

* copies of the Software, and to permit persons to whom the Software is 

* furnished to do so, subject to the following conditions:

*

* The above copyright notice and this permission notice shall be included in 

* all copies or substantial portions of the Software.

*

* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR 

* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 

* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE 

* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 

* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, 

* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE 

* SOFTWARE.

**/

var css = {



  getElementsByClass: function (node, searchClass, tag)
  {

    var classElements = new Array();

    var els = node.getElementsByTagName(tag);

    var elsLen = els.length;

    var pattern = new RegExp("(^|\\s)" + searchClass + "(\\s|$)");





    for (var i = 0, j = 0; i < elsLen; i++)
    {

      if (this.elementHasClass(els[i], searchClass))
      {

        classElements[j] = els[i];

        j++;

      }

    }

    return classElements;

  },



  privateGetClassArray: function (el)
  {

    return el.className.split(' ');

  },



  privateCreateClassString: function (classArray)
  {

    return classArray.join(' ');

  },



  elementHasClass: function (el, classString)
  {

    if (!el)
    {

      return false;

    }



    var regex = new RegExp('\\b' + classString + '\\b');

    if (el.className.match(regex))
    {

      return true;

    }



    return false;

  },



  addClassToId: function (idString, classString)
  {

    this.addClassToElement(document.getElementById(idString), classString);

  },



  addClassToElement: function (el, classString)
  {

    var classArray = this.privateGetClassArray(el);



    if (this.elementHasClass(el, classString))
    {

      return; // already has element so don't need to add it

    }



    classArray.push(classString);



    el.className = this.privateCreateClassString(classArray);

  },



  removeClassFromId: function (idString, classString)
  {

    this.removeClassFromElement(document.getElementById(idString), classString);

  },





  removeClassFromElement: function (el, classString)
  {

    var classArray = this.privateGetClassArray(el);



    for (x in classArray)
    {

      if (classString == classArray[x])
      {

        classArray[x] = '';

        break;

      }

    }



    el.className = this.privateCreateClassString(classArray);

  }

}





/**

* Written by Neil Crosby. 

* http://www.workingwith.me.uk/articles/scripting/standardista_table_sorting

*

* This module is based on Stuart Langridge's "sorttable" code.  Specifically, 

* the determineSortFunction, sortCaseInsensitive, sortDate, sortNumeric, and

* sortCurrency functions are heavily based on his code.  This module would not

* have been possible without Stuart's earlier outstanding work.

*

* Use this wherever you want, but please keep this comment at the top of this file.

*

* Copyright (c) 2006 Neil Crosby

*

* Permission is hereby granted, free of charge, to any person obtaining a copy 

* of this software and associated documentation files (the "Software"), to deal 

* in the Software without restriction, including without limitation the rights

* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell 

* copies of the Software, and to permit persons to whom the Software is 

* furnished to do so, subject to the following conditions:

*

* The above copyright notice and this permission notice shall be included in 

* all copies or substantial portions of the Software.

*

* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR 

* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 

* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE 

* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 

* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, 

* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE 

* SOFTWARE.

**/

var standardistaTableSorting = {



  that: false,

  isOdd: false,



  sortColumnIndex: -1,

  lastAssignedId: 0,

  newRows: -1,

  lastSortedTable: -1,



  /**

* Initialises the Standardista Table Sorting module

**/

  init: function ()
  {

    // first, check whether this web browser is capable of running this script

    if (!document.getElementsByTagName)
    {

      return;

    }

    this.that = this;



    this.run();



  },



  /**

* Runs over each table in the document, making it sortable if it has a class

* assigned named "sortable" and an id assigned.

**/

  run: function ()
  {

    var tables = document.getElementsByTagName("table");



    for (var i = 0; i < tables.length; i++)
    {

      var thisTable = tables[i];



      if (css.elementHasClass(thisTable, 'sortable'))
      {

        this.makeSortable(thisTable);

      }

    }

  },



  /**

* Makes the given table sortable.

**/

  makeSortable: function (table)
  {



    // first, check if the table has an id.  if it doesn't, give it one

    if (!table.id)
    {

      table.id = 'sortableTable' + this.lastAssignedId++;

    }



    // if this table does not have a thead, we don't want to know about it

    if (!table.tHead || !table.tHead.rows || 0 == table.tHead.rows.length)
    {

      return;

    }



    // we'll assume that the last row of headings in the thead is the row that 

    // wants to become clickable

    var row;

    for (var i = 0; i < table.tHead.rows.length; i++)
    {

      row = table.tHead.rows[i];

      if (row.className == 'rowgreen')

        break;

    }

    //var row = table.tHead.rows[table.tHead.rows.length - 1];



    for (var i = 0; i < row.cells.length; i++)
    {



      // create a link with an onClick event which will 

      // control the sorting of the table

      var linkEl = createElement('a');

      linkEl.href = '#';

      linkEl.onclick = this.headingClicked;

      linkEl.setAttribute('columnId', i);

      linkEl.title = 'Click to sort';

      linkEl.className = 'contentlink';



      // move the current contents of the cell that we're 

      // hyperlinking into the hyperlink

      var innerEls = row.cells[i].childNodes;

      for (var j = 0; j < innerEls.length; j++)
      {

        linkEl.appendChild(innerEls[j]);

      }



      // and finally add the new link back into the cell

      row.cells[i].appendChild(linkEl);



      var spanEl = createElement('span');

      spanEl.className = 'tableSortArrow';

      spanEl.appendChild(document.createTextNode('\u00A0\u00A0'));

      row.cells[i].appendChild(spanEl);



    }



    if (css.elementHasClass(table, 'autostripe'))
    {

      this.isOdd = false;

      var rows = table.tBodies[0].rows;



      // We appendChild rows that already exist to the tbody, so it moves them rather than creating new ones

      for (var i = 0; i < rows.length; i++)
      {

        this.doStripe(rows[i]);

      }

    }

  },



  headingClicked: function (e)
  {



    var that = standardistaTableSorting.that;



    // linkEl is the hyperlink that was clicked on which caused

    // this method to be called

    var linkEl = getEventTarget(e);

    linkEl = linkEl.parentNode;



    // directly outside it is a td, tr, thead and table

    var td = linkEl.parentNode;

    var tr = td.parentNode;

    var thead = tr.parentNode;

    var table = thead.parentNode;



    // if the table we're looking at doesn't have any rows

    // (or only has one) then there's no point trying to sort it

    /*ORIGif (!table.tBodies || table.tBodies[0].rows.length <= 1) {

return false;

}*/



    if (!table || table.rows.length <= 1)
    {

      return false;

    }



    // the column we want is indicated by td.cellIndex

    var column = linkEl.getAttribute('columnId') || td.cellIndex;

    //var column = td.cellIndex;



    // find out what the current sort order of this column is

    var arrows = css.getElementsByClass(td, 'tableSortArrow', 'span');

    var previousSortOrder = '';

    if (arrows.length > 0)
    {

      previousSortOrder = arrows[0].getAttribute('sortOrder');

    }



    // work out how we want to sort this column using the data in the first cell

    // but just getting the first cell is no good if it contains no data

    // so if the first cell just contains white space then we need to track

    // down until we find a cell which does contain some actual data

    /*ORIGvar itm = ''

var rowNum = 0;

while ('' == itm && rowNum < table.tBodies[0].rows.length) {

itm = that.getInnerText(table.tBodies[0].rows[rowNum].cells[column]);

rowNum++;

}

var sortfn = that.determineSortFunction(itm);*/



    var itm = ''

    var rowNum = 4;



    if (table.rows[rowNum].className == 'rowred')
    {

      rowNum++;

    }



    while ('' == itm && rowNum < (table.rows.length))
    {/* Dont do the last 2 rows*/

      itm = that.getInnerText(table.rows[rowNum].cells[column]);

      rowNum++;

    }

    if (!itm)

      return false;

    var sortfn = that.determineSortFunction(itm);



    // if the last column that was sorted was this one, then all we need to 

    // do is reverse the sorting on this column

    if (table.id == that.lastSortedTable && column == that.sortColumnIndex)
    {

      newRows = that.newRows;



      var tempRows = new Array();



      for (var j = 0; j < (newRows.length - 2) ; j++)
      {

        tempRows[j] = newRows[j];

      }



      tempRows.reverse();

      for (var j = 0; j < (tempRows.length) ; j++)
      {

        newRows[j] = tempRows[j];

      }



      // otherwise, we have to do the full sort

    } else
    {

      that.sortColumnIndex = column;

      var newRows = new Array();



      var j = 0;

      for (j = 0; j < (table.tBodies[0].rows.length - 2) ; j++)
      {

        newRows[j] = table.tBodies[0].rows[j];

      }



      newRows.sort(sortfn);

      // add in the fixed rows

      newRows[j] = table.tBodies[0].rows[j]; j++;

      newRows[j] = table.tBodies[0].rows[j]; j++;



    }



    that.moveRows(table, newRows);

    that.newRows = newRows;

    that.lastSortedTable = table.id;



    // now, give the user some feedback about which way the column is sorted



    // first, get rid of any arrows in any heading cells

    var arrows = css.getElementsByClass(tr, 'tableSortArrow', 'span');

    for (var j = 0; j < arrows.length; j++)
    {

      var arrowParent = arrows[j].parentNode;

      arrowParent.removeChild(arrows[j]);



      if (arrowParent != td)
      {

        spanEl = createElement('span');

        spanEl.className = 'tableSortArrow';

        spanEl.appendChild(document.createTextNode('\u00A0\u00A0'));

        arrowParent.appendChild(spanEl);

      }

    }



    // now, add back in some feedback 

    var spanEl = createElement('span');

    spanEl.className = 'tableSortArrow';

    if (null == previousSortOrder || '' == previousSortOrder || 'DESC' == previousSortOrder)
    {

      spanEl.appendChild(document.createTextNode(' \u2191'));

      spanEl.setAttribute('sortOrder', 'ASC');

    } else
    {

      spanEl.appendChild(document.createTextNode(' \u2193'));

      spanEl.setAttribute('sortOrder', 'DESC');

    }



    td.appendChild(spanEl);



    return false;

  },



  getInnerText: function (el)
  {



    if ('string' == typeof el || 'undefined' == typeof el)
    {

      return el;

    }



    //if (el.firstChild.innerHTML) {

    //return el.firstChild.innerHTML;  // Not needed but it is faster

    //}



    var str = el.getAttribute('standardistaTableSortingInnerText');

    if (null != str && '' != str)
    {

      return str;

    }

    str = '';



    var cs = el.childNodes;

    var l = cs.length;

    for (var i = 0; i < l; i++)
    {

      // 'if' is considerably quicker than a 'switch' statement, 

      // in Internet Explorer which translates up to a good time 

      // reduction since this is a very often called recursive function

      if (1 == cs[i].nodeType)
      { // ELEMENT NODE

        str += this.getInnerText(cs[i]);

        break;

      } else if (3 == cs[i].nodeType)
      { //TEXT_NODE

        str += cs[i].nodeValue;

        break;

      }

    }



    // set the firstChild.innerHTML for this element directly on the element

    // so that it can be retrieved early next time the firstChild.innerHTML

    // is requested

    el.setAttribute('standardistaTableSortingInnerText', str);



    return str;

  },



  determineSortFunction: function (itm)
  {



    var sortfn = this.sortCaseInsensitive;



    if (itm.match(/^\d\d[\/-]\d\d[\/-]\d\d\d\d$/))
    {

      sortfn = this.sortDate;

    }

    if (itm.match(/^\d\d[\/-]\d\d[\/-]\d\d$/))
    {

      sortfn = this.sortDate;

    }

    if (itm.match(/^[£$]/))
    {

      sortfn = this.sortCurrency;

    }

    if (itm.match(/^\d?\.?\d+$/))
    {

      sortfn = this.sortNumeric;

    }

    if (itm.match(/^[0-9]{1,3}(,[0-9]{3})*(\.[0-9]+)?$/))
    {

      sortfn = this.sortNumeric;

    }



    if (itm.match(/^[+-]?\d*\.?\d+([eE]-?\d+)?$/))
    {

      sortfn = this.sortNumeric;

    }

    if (itm.match(/^([01]?\d\d?|2[0-4]\d|25[0-5])\.([01]?\d\d?|2[0-4]\d|25[0-5])\.([01]?\d\d?|2[0-4]\d|25[0-5])\.([01]?\d\d?|2[0-4]\d|25[0-5])$/))
    {

      sortfn = this.sortIP;

    }



    return sortfn;

  },



  sortCaseInsensitive: function (a, b)
  {

    var that = standardistaTableSorting.that;



    var aa = that.getInnerText(a.cells[that.sortColumnIndex]).toLowerCase();

    var bb = that.getInnerText(b.cells[that.sortColumnIndex]).toLowerCase();

    if (aa == bb)
    {

      return 0;

    } else if (aa < bb)
    {

      return -1;

    } else
    {

      return 1;

    }

  },



  sortDate: function (a, b)
  {

    var that = standardistaTableSorting.that;



    // y2k notes: two digit years less than 50 are treated as 20XX, greater than 50 are treated as 19XX

    var aa = that.getInnerText(a.cells[that.sortColumnIndex]);

    var bb = that.getInnerText(b.cells[that.sortColumnIndex]);



    var dt1, dt2, yr = -1;



    if (aa.length == 10)
    {

      dt1 = aa.substr(6, 4) + aa.substr(3, 2) + aa.substr(0, 2);

    } else
    {

      yr = aa.substr(6, 2);

      if (parseInt(yr) < 50)
      {

        yr = '20' + yr;

      } else
      {

        yr = '19' + yr;

      }

      dt1 = yr + aa.substr(3, 2) + aa.substr(0, 2);

    }



    if (bb.length == 10)
    {

      dt2 = bb.substr(6, 4) + bb.substr(3, 2) + bb.substr(0, 2);

    } else
    {

      yr = bb.substr(6, 2);

      if (parseInt(yr) < 50)
      {

        yr = '20' + yr;

      } else
      {

        yr = '19' + yr;

      }

      dt2 = yr + bb.substr(3, 2) + bb.substr(0, 2);

    }



    if (dt1 == dt2)
    {

      return 0;

    } else if (dt1 < dt2)
    {

      return -1;

    }

    return 1;

  },



  sortCurrency: function (a, b)
  {

    var that = standardistaTableSorting.that;



    var aa = that.getInnerText(a.cells[that.sortColumnIndex]).replace(/[^0-9.]/g, '');

    var bb = that.getInnerText(b.cells[that.sortColumnIndex]).replace(/[^0-9.]/g, '');

    return parseFloat(aa) - parseFloat(bb);

  },



  sortNumeric: function (a, b)
  {

    var that = standardistaTableSorting.that;



    var aa = llHelper.convertToFloat(that.getInnerText(a.cells[that.sortColumnIndex]));

    if (isNaN(aa))
    {

      aa = 0;

    }

    var bb = llHelper.convertToFloat(that.getInnerText(b.cells[that.sortColumnIndex]));

    if (isNaN(bb))
    {

      bb = 0;

    }

    return aa - bb;

  },



  makeStandardIPAddress: function (val)
  {

    var vals = val.split('.');



    for (x in vals)
    {

      val = vals[x];



      while (3 > val.length)
      {

        val = '0' + val;

      }

      vals[x] = val;

    }



    val = vals.join('.');



    return val;

  },



  sortIP: function (a, b)
  {

    var that = standardistaTableSorting.that;



    var aa = that.makeStandardIPAddress(that.getInnerText(a.cells[that.sortColumnIndex]).toLowerCase());

    var bb = that.makeStandardIPAddress(that.getInnerText(b.cells[that.sortColumnIndex]).toLowerCase());

    if (aa == bb)
    {

      return 0;

    } else if (aa < bb)
    {

      return -1;

    } else
    {

      return 1;

    }

  },



  moveRows: function (table, newRows)
  {

    this.isOdd = false;



    // We appendChild rows that already exist to the tbody, so it moves them rather than creating new ones

    for (var i = 0; i < newRows.length; i++)
    {

      var rowItem = newRows[i];



      this.doStripe(rowItem);



      table.tBodies[0].appendChild(rowItem);

    }

    //table.tBodies[0].appendChild(that.table.tBodies[0].rows[that.table.tBodies[0].rows.length-1]); // Add the last 2 fixed rows

    //table.tBodies[0].appendChild(that.table.tBodies[0].rows[that.table.tBodies[0].rows.length]); 

  },



  doStripe: function (rowItem)
  {

    if (this.isOdd)
    {

      css.addClassToElement(rowItem, 'odd');

    } else
    {

      css.removeClassFromElement(rowItem, 'odd');

    }



    this.isOdd = !this.isOdd;

  }



}

// Translator Widget
setTimeout
(
  function () {
      {
          var s = document.createElement('script');
          s.type = 'text/javascript'; s.charset = 'UTF-8';
          s.src = ((location && location.href && location.href.indexOf('https') == 0) ? 'https://ssl.microsofttranslator.com' : 'http://www.microsofttranslator.com') + '/ajax/v3/WidgetV3.ashx?siteData=ueOIGRSKkd965FeEGM5JtQ**&ctf=false&ui=true&settings=Manual&from=en';
          var p = document.getElementsByTagName('head')[0] || document.documentElement;
          p.insertBefore(s, p.firstChild);
      }
  }, 0
 );
