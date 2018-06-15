var prevSortColumnId; //poradove cislo sloupce podle ktereho je tabulka setridena
var sortOrder; //+1 = ascending  -1 = descending


function sortTable(tableId, sortColId) {

    //funkce řadi radky tabulky podle zvoleneho sloupce vzestupne
    var table, rows, switching, i, x, y, shouldSwitch;
    table = document.getElementById(tableId);
    switching = true;

    //
    if (prevSortColumnId !== undefined) {
        //uz jsme sortovali, menime porai sortovani 
        if (prevSortColumnId == sortColId) {
            alert('kliknuta stejna sipka, menime asc/desc');
        }

        //pokud jsme v sloupci nově, tak mazeme sipku v predchozim sloupci
        var arrowCell = document.getElementById('arrowDiv_' + prevSortColumnId);
        arrowCell.innerHTML = '&nbsp;';
        arrowCell.removeAttribute('onclick');

        //zaznamenavame jmeno sloupce
        prevSortColumnId = sortColId;

        var arrowCell = document.getElementById('arrowDiv_' + sortColId);
        arrowCell.innerHTML = '&darr;';
        //arrowCell.onclick = function () { console.log('asc/desc'); }
    }
    else {
        //jeste jsme nesortovali, tak kreslime prvni spiku
        //ukladame cislo sloupce podle ktereho sortujeme
        prevSortColumnId = sortColId;

        //pridavame sipku
        var arrowCell = document.getElementById('arrowDiv_' + sortColId);
        arrowCell.innerHTML = '&darr;';

        //zaznamenavame poradi trideni asc/desc
        sortOrder = 1; //+1 = ascending  -1 = descending

        arrowCell.onclick = function () { console.log('asc/desc'); }


    }

    /*Make a loop that will continue until no switching has been done:*/
    while (switching) {

        //start by saying: no switching is done:
        switching = false;

        rows = table.getElementsByTagName("TR");

        /*Loop through all table rows (except the first, which contains table headers):*/
        for (i = 1; i < (rows.length - 1); i++) {
            //start by saying there should be no switching:
            shouldSwitch = false;
            /*Get the two elements you want to compare, one from current row and one from the next:*/
            x = rows[i].getElementsByTagName("TD")[sortColId];
            y = rows[i + 1].getElementsByTagName("TD")[sortColId];

            var sortAlphabetically = isNaN(x.innerHTML.toLowerCase());

            if (sortAlphabetically) {
                //radime podle abecedy

                //zjistujeme typ sloupce
                var sortCell = getSortCell(tableId, sortColId);

                if (sortCell.attributes['columndatatype'].textContent.toUpperCase() == 'HYPERLINK') {

                    var hyp1 = x.childNodes[0].innerText;
                    var hyp2 = y.childNodes[0].innerText;
                    
                    if (hyp1 > hyp2) {
                        //if so, mark as a switch and break the loop:
                        shouldSwitch = true;
                        break;
                    }
                }


                if (sortCell.attributes['columndatatype'].textContent.toUpperCase() == 'DATE') {
                    //radime sloupec s datem
                    var dateFormat = sortCell.attributes['columnDateFormat'].textContent;
                    var delimiter = sortCell.attributes['columnDateFormatdelimiter'].textContent;
                    var date1 = stringToDate(x.innerText, dateFormat, delimiter);
                    var date2 = stringToDate(y.innerText, dateFormat, delimiter);

                    if (date1 < date2) {
                        //if so, mark as a switch and break the loop:
                        shouldSwitch = true;
                        break;
                    }
                }


                if (sortCell.attributes['columndatatype'].textContent.toUpperCase() == 'TEXT') {

                    if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                        //if so, mark as a switch and break the loop:
                        shouldSwitch = true;
                        break;
                    }
                }

                if (sortCell.attributes['columndatatype'].textContent.toUpperCase() == 'SELECT-ONE') {
                    //jde o select
                    var selectElem1 = document.getElementById(x.childNodes[0].id);
                    var txtPhrase1 = selectElem1.options[selectElem1.selectedIndex].text;

                    var selectElem2 = document.getElementById(y.childNodes[0].id);
                    var txtPhrase2 = selectElem2.options[selectElem2.selectedIndex].text;

                    //check if the two rows should switch place:
                    if (txtPhrase1 > txtPhrase2) {
                        //if so, mark as a switch and break the loop:
                        shouldSwitch = true;
                        break;
                    }
                }

                if (sortCell.attributes['columndatatype'].textContent.toUpperCase() == 'CHECKBOX') {
                    //jde o select input
                    var selectInput1 = document.getElementById(x.childNodes[0].id);
                    var selValue1 = selectInput1.checked;
                    var val1 = selValue1 ? 1 : 0; //pokud je zaskrtnuty checkbox, pak davame 1

                    var selectInput2 = document.getElementById(y.childNodes[0].id);
                    var selValue2 = selectInput2.checked;
                    var val2 = selValue2 ? 1 : 0; //pokud je zaskrtnuty checkbox, pak davame 1

                    if (val1 < val2) {
                        //if so, mark as a switch and break the loop:
                        shouldSwitch = true;
                        break;
                    }
                }

            }

            else {
                //radime numericky
                if (Number(x.innerText) > Number(y.innerText)) {
                    //if so, mark as a switch and break the loop:
                    shouldSwitch = true;
                    break;
                }
            }



        }
        if (shouldSwitch) {
            /*If a switch has been marked, make the switch and mark that a switch has been done:*/
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
        }
    }

    function stringToDate(_date, _format, _delimiter) {
        //funkce prevadi string na datum podle zvoleneho formatu

        //napr. stringToDate("17/9/2014","dd/MM/yyyy","/");
        //napr. stringToDate("9/17/2014", "mm/dd/yyyy", "/")
        //napr. stringToDate("9-17-2014", "mm-dd-yyyy", "-")

        var formatLowerCase = _format.toLowerCase();
        var formatItems = formatLowerCase.split(_delimiter);
        var dateItems = _date.split(_delimiter);
        var monthIndex = formatItems.indexOf("mm");
        var dayIndex = formatItems.indexOf("dd");
        var yearIndex = formatItems.indexOf("yyyy");
        var month = parseInt(dateItems[monthIndex]);
        month -= 1;
        var formatedDate = new Date(dateItems[yearIndex], month, dateItems[dayIndex]);
        //var formatedDate = new Date(dateItems[yearIndex]);
        return formatedDate;
    }

    function getSortCell(tableId, sortColId) {
        var table = document.getElementById(tableId);
        prevSortColumnId = sortColId;
        sortCell = table.tHead.firstChild.childNodes[sortColId];
        return sortCell;
    }
}



