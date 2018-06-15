var dataSource = [
    {
        "ID": 1,
        "Color": "#87cbe1",
        "FirstName": "Matouš",
        "LastName": "Havránek",
        "Prefix": "Mr.",
        "Position": "design / programming",
        "Picture": "images/employees/Havranek_Matous.png",
        "BirthDate": "28.1.2000",
        "HireDate": "1995/01/15",
        "Notes": "John has been in the Audio/Video industry since 1990. He has led DevAv as its CEO since 2003. When not working hard as the CEO, John loves to golf and bowl. He once bowled a perfect game of 300.",
        "Address": "351 S Hill St.",
        "Status": 1,
        "Divorced": true,
        "Hyperlink":
            {
                "text": "ccc.eu",
                "url": "http://ccc.eu"
            }
    }
    , {
        "ID": 2,
        "Color": "#f5d775",
        "FirstName": "Martin",
        "LastName": "Strnad",
        "Prefix": "Mrs.",
        "Position": "programming",
        "Picture": "images/employees/Strnad_Martin.png",
        "BirthDate": "17.6.1970",
        "HireDate": "2012/05/14",
        "Notes": "Olivia loves to sell. She has been selling DevAV products since 2012.  Olivia was homecoming queen in high school. She is expecting her first child in 6 months. Good Luck Olivia.",
        "Address": "807 W Paseo Del Mar",
        "Status": 0,
        "Divorced": false,
        "Hyperlink":
            {
                "text": "bbb.com",
                "url": "www.bbb.com"
            }
    }, {
        "ID": 3,
        "Color": "#b0e483",
        "FirstName": "Petr",
        "LastName": "Dosedel",
        "Prefix": "Mr.",
        "Position": "CMO",
        "Picture": "images/employees/Dosedel_Petr.png",
        "BirthDate": "26.12.1980",
        "HireDate": "2002/11/08",
        "Notes": "Robert was recently voted the CMO of the year by CMO Magazine. He is a proud member of the DevAV Management Team. Robert is a championship BBQ chef, so when you get the chance ask him for his secret recipe.",
        "Address": "4 Westmoreland Pl.",
        "Status": 2,
        "Divorced": true,
        "Hyperlink":
            {
                "text": "aaa.com",
                "url": "www.aaa.com"
            }
    }];

var selectBoxItems =
    [
        {
            itemName: 'single',
            itemValue: '0',
            f: function () { alert() }
        },
        {
            itemName: 'married',
            itemValue: '1'
        }
        ,
        {
            itemName: 'complicated',
            itemValue: '2'
        }
        ,
        {
            itemName: 'alone',
            itemValue: '3'
        }
    ];

var data = {
    dataSource: dataSource,

    rowTemplate: function (rowElement, dataItem) {
        //alert("rowTemplate: " + rowElement + " radek:" + dataSource[dataItem].Color);
        rowElement.setAttribute("style", "background-color: " + dataSource[dataItem].Color+";");
    },

    columns: [


        {
            caption: "Photo",
            width: 150,
            dataField: "Picture",
            dataType: "image",
            sortable: false
        },
        {
            caption: "WWW",
            dataType: 'hyperlink',
            dataField: 'Hyperlink',
            sortable: true
        },
        {

            dataField: "Prefix",
            caption: "Title",
            dataType: "text",
            width: 70,
            sortable: true
        },
        {
            caption: "FirstName",
            dataField: "FirstName",
            dataType: "text",
            sortable: true
        },
        {
            caption: "LastName",
            dataField: "LastName",
            dataType: "text",
            sortable: true
        },

        {
            caption: "Job",
            dataField: "Position",
            dataType: "text",
            sortable: true
        },

        {
            caption: "Birth date",
            dataField: "BirthDate",
            dataType: "date",
            dateFormat: "dd.mm.yyyy",
            dateFormatDelimiter: ".",
            sortable: true
        },
        {
            caption: "Status",
            dataType: 'select-one',
            dataField: 'Status',
            items: selectBoxItems,
            onChangeFunction: function () {
                alert("Selection changed...")
            },
            sortable: true
        },
        {
            caption: "Divorced?",
            dataType: 'checkBox',
            dataField: 'Divorced',
            text: "rozvedeny",
            onChangeFunction: function () { alert("Checkbox changed...") },
            sortable: true
        }
    ]
}