using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Newtonsoft.Json;

public partial class WUI_FlexGrid_test : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        string clientScript = GetDataSourceScript();
        LoadClientScript(GetDataSourceScript(), "uniqueScriptIdentifier");
    }

    private void LoadClientScript(string script, string scriptIdentifier)
    {
        ClientScriptManager cs = Page.ClientScript;
        Type cstype = this.GetType();

        // Check to see if the client script is already registered.
        if (!cs.IsClientScriptBlockRegistered(cstype, scriptIdentifier))
        {
            StringBuilder clientScriptString = new StringBuilder();
            clientScriptString.Append(script);
            cs.RegisterClientScriptBlock(cstype, scriptIdentifier, clientScriptString.ToString());
        }
    }

    private string GetDataSourceScript() {
        //pole zamestnancu
        SampleEmployee[] employees = new SampleEmployee[3];

        //myEmployee1
        SampleEmployee myEmployee1 = new SampleEmployee();
        SampleHyperLink myHyperLink1 = new SampleHyperLink();

        myHyperLink1.text = "matous.eu";
        myHyperLink1.url = "www.matous.eu";

        myEmployee1.ID = 1;
        myEmployee1.FirstName = "matous";
        myEmployee1.LastName = "havranek";
        myEmployee1.Prefix = "10";
        myEmployee1.Position = "designer";
        myEmployee1.Hyperlink = myHyperLink1;
        myEmployee1.Status = 1;
        myEmployee1.Divorced = false;
        myEmployee1.Color = "#87cbe1";
        myEmployee1.BirthDate = "14.8.1972";
        myEmployee1.Picture = "images/employees/Havranek_Matous.png";

        employees[0] = myEmployee1;

        //myEmployee1
        SampleEmployee myEmployee2 = new SampleEmployee();
        SampleHyperLink myHyperLink2 = new SampleHyperLink();

        myHyperLink2.text = "martin.eu";
        myHyperLink2.url = "www.martin.eu";

        myEmployee2.ID = 2;
        myEmployee2.FirstName = "martin";
        myEmployee2.LastName = "strnad";
        myEmployee2.Prefix = "250";
        myEmployee2.Position = "programmer";
        myEmployee2.Hyperlink = myHyperLink2;
        myEmployee2.Status = 2;
        myEmployee2.Divorced = false;
        myEmployee2.Color = "#f5d775";
        myEmployee2.BirthDate = "16.11.1973";
        myEmployee2.Picture = "images/employees/Strnad_Martin.png";

        employees[1] = myEmployee2;

        //myEmployee3
        SampleEmployee myEmployee3 = new SampleEmployee();
        SampleHyperLink myHyperLink3 = new SampleHyperLink();

        myHyperLink3.text = "petr.eu";
        myHyperLink3.url = "www.petr.eu";

        myEmployee3.ID = 3;
        myEmployee3.FirstName = "petr";
        myEmployee3.LastName = "dosedel";
        myEmployee3.Position = "pre-press";
        myEmployee3.Prefix = "50";
        myEmployee3.Hyperlink = myHyperLink3;
        myEmployee3.Status = 0;
        myEmployee3.Divorced = true;
        myEmployee3.Color = "#b0e483";
        myEmployee3.BirthDate = "16.11.1972";
        myEmployee3.Picture = "images/employees/Dosedel_Petr.png";

        employees[2] = myEmployee3;


        string output = "<script>var dataSource =" + JsonConvert.SerializeObject(employees)+ "</script>";

        return output;
    }
}