function createFlexGrid(elem, dataObject) {
    //funkce renderuje flexGrid do elementu elem

    var dataSource = dataObject.dataSource;

    var tbl = document.createElement('table');
    tbl.id = "mySortEditTable";
    tbl.className = 'WUIFlexGrid';


    //hlavicka tabulky
    var header = tbl.createTHead();
    var row = header.insertRow(0);

    //sloupce hlavicky
    for (var sloupec = 0; sloupec < dataObject.columns.length; sloupec++) {
        var cell = row.insertCell(sloupec);
        var caption = dataObject.columns[sloupec].caption;

        if (dataObject.columns[sloupec].sortable) {
            //pokud sloupec podporuje sortovani, pak prirazujeme sortovaci funkci
            cell.innerHTML = "<div class='sortableColumn' onclick='sortTable(\"mySortEditTable\", " + sloupec + ");'>" + caption + "</div>";

            //nastavujeme atributy sloupce
            cell.setAttribute('columnDataType', dataObject.columns[sloupec].dataType);

            //pokud se jedna o datum, pridavame dalsi atributy
            if (dataObject.columns[sloupec].dataType == 'date')
            {
                cell.setAttribute('columnDateFormat', dataObject.columns[sloupec].dateFormat);
                cell.setAttribute('columnDateFormatdelimiter', dataObject.columns[sloupec].dateFormatDelimiter);
            }

            var arrowDiv = createArrowDiv(tbl, sloupec);

            cell.appendChild(arrowDiv);
        }
        else {
            //jinak jen zobrazujeme nadpis sloupce
            cell.innerHTML = "<div class='nonSortableColumn'>" + caption + "</div>";
        }
    }

    //sloupce tabulky   
    var tbdy = document.createElement('tbody');

    for (var radek = 0; radek < dataSource.length; radek++) {
        //row
        var tr = document.createElement('tr');
        tr.className = "rowHover";

        //spoustime funkci pro editaci radku
        if (dataObject.rowTemplate !== undefined) {
            dataObject.rowTemplate(tr, radek);
        }


        for (var colCounter = 0; colCounter < dataObject.columns.length; colCounter++) {
            //cell
            var td = document.createElement('td');
            var dataField = dataObject.columns[colCounter].dataField;
            var element;

            if (dataField !== undefined) {
                //je definovany zdroj dat
                var data = dataSource[radek][dataField];
                var dataType = dataObject.columns[colCounter].dataType;

                //renderujeme selectBox
                if (dataType == 'select-one') {
                    var selectedValue = data;
                    var datFieldName = dataObject.columns[colCounter].dataField;
                    var data = { defaultValue: selectedValue, items: dataObject.columns[colCounter].items, row: radek, col: datFieldName };
                    data.onChangeFunction = updateDataSource;
                }

                //renderujeme checkBox
                if (dataType == 'checkBox') {
                    var selectedValue = data;
                    var chkText = dataObject.columns[colCounter].text;
                    var chkValue = selectedValue;
                    var datFieldName = dataObject.columns[colCounter].dataField;
                    var data = { caption: chkText, value: chkValue, row: radek, col: datFieldName };
                    data.onChangeFunction = updateDataSource;
                }

                //ziskavame konkretni HTML element pro vlozeni do bunky

                var element = renderElement(dataType, data);
                td.appendChild(element)
            }
            tr.appendChild(td)
        }
        tbdy.appendChild(tr);
    }
    tbl.appendChild(tbdy);
    elem.appendChild(tbl);

    function updateDataSource(e) {
        //console.log("Update dataSource..." + e.target.id );
        //console.dir(dataMapping.dataSource);

        //parsrujeme id elementu a ziskavame cislo radku a sloupce
        var splitString = e.target.id.split("_");
        var row = splitString[1];
        var col = splitString[2];

        //aktualizujeme patricnou bunku datasource
        var val = dataObject.dataSource[row][col];

        var typ = e.target.type;

        switch (e.target.type) {
            case 'checkbox':
                var newVal = e.target.checked;
                dataObject.dataSource[row][col] = newVal;
                break;
            case 'select-one':
                var newVal = e.target.value;
                dataObject.dataSource[row][col] = newVal;
                break;
        }

        //tvorime novy event
        var event = new CustomEvent(
            "eventDataSourceUpdated",
            {
                detail: {
                    dataSource: dataObject.dataSource,
                    time: new Date(),
                },
                bubbles: true,
                cancelable: true
            }
        );

        //posilame event
        dispatchEvent(event);
    }

    function renderElement(dataType, data) {
        //funkce vraci HTML element podle zadaneho dataType a majici hodnotu data
        if (data == null) {
            return document.createTextNode("");
        }


        switch (dataType) {
            case 'image':
                var img = document.createElement("IMG");
                img.src = data;
                return img;
                break;
            case 'text':
                return document.createTextNode(data);
                break;

            case 'select-one':
                var ddl = createDropDownList(data);
                ddl.selectedIndex = data.defaultValue;
                return ddl;
                break;

            case 'checkBox':
                var chkBox = createCheckBox(data);
                chkBox.checked = data.value;
                return chkBox;
                break;

            case 'hyperlink':

                return createHyperlink(data);
                break;

            default:
                return document.createTextNode(data);
        }
    }

    function createCheckBox(data) {
        var checkbox = document.createElement('input');
        checkbox.type = "checkbox";
        checkbox.name = "name";
        checkbox.value = 0;
        checkbox.id = "elemCheckbox_" + data.row + "_" + data.col;
        checkbox.onchange = data.onChangeFunction;

        return checkbox;
    }

    function createHyperlink(data) {
        //funkce vraci hyperlink
        var hyp = document.createElement('a');
        hyp.appendChild(document.createTextNode(data.text));
        hyp.title = data.text;
        hyp.href = data.url;
        return hyp;
    }

    function createDropDownList(data) {
        //funkce vytvari DropDown list
        var selectList = document.createElement("select");
        selectList.id = "select_" + data.row + "_" + data.col;

        if (data.onChangeFunction !== 'undefined') {
            selectList.onchange = data.onChangeFunction;
        }
        else {
            selectList.onchange = function () { alert('dropDown list click'); };
        }

        for (var i = 0; i < data.items.length; i++) {
            var option = document.createElement("option");
            option.value = data.items[i].itemValue;
            option.text = data.items[i].itemName;
            selectList.appendChild(option);
        }
        return selectList;
    }

    function createArrowDiv(tbl, sloupec) {
        var arrowDiv = document.createElement('div');
        arrowDiv.id = "arrowDiv_" + sloupec;
        arrowDiv.className = "arrowDiv"
        arrowDiv.innerHTML = "&nbsp;";
        arrowDiv.onclick = function () { sortTable(tbl, sloupec) };

        return arrowDiv;
    }


}







