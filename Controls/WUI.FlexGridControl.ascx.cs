using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.UI;
using System.Web.UI.HtmlControls;
using System.Web.UI.WebControls;

public partial class Controls_WUI_FlexGridControl : System.Web.UI.UserControl
{
    //JS script ktery obsahuje jak data, tak i jejich mapovani do sloupcu
    public string DataIntegrationScript { get; set; }

    //JS script ktery obsluhuje udalost §eventDataSourceUpdated§
    public string EventListenerScript { get; set; }

    protected void Page_Load(object sender, EventArgs e)
    {
        //nalinkovat styly
        LoadClientStyle("WUI.flexGrid.css", "/css/WUI.flexGrid.css");
        LoadClientStyle("WUI.Default.css", "/css/WUI.Default.css");

        //nalinkovat javascripty
        LoadClientScript("<script src='/js/WUI.SortTable.js'></script>", "1");
        LoadClientScript("<script src='/js/WUI.FlexGrid.js'></script>", "2");
        LoadClientScript("<script src='/js/WUI.js'></script>", "3");

        LoadClientScript(DataIntegrationScript, "4");


        Panel cont = new Panel();
        cont.ClientIDMode = ClientIDMode.Static;
        cont.ID = "WUIflexgrid_" + RandomString(3);
        cont.CssClass = "WUIflexgrid";
        this.Controls.Add(cont);

        //pridat script pro volani funkce vytovreni flexGridu
        LoadStartupScript("<script>WUI.flexGrid('"+ cont.ID + "', data);</script>", "5");

        LoadStartupScript(EventListenerScript, "6");
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

    private void LoadStartupScript(string script, string scriptIdentifier)
    {
        ClientScriptManager cs = Page.ClientScript;
        Type cstype = this.GetType();

        // Check to see if the client script is already registered.
        if (!cs.IsStartupScriptRegistered(cstype, scriptIdentifier))
        {
            StringBuilder clientScriptString = new StringBuilder();
            clientScriptString.Append(script);
            cs.RegisterStartupScript(cstype, scriptIdentifier, clientScriptString.ToString());
        }
    }

    private void LoadClientStyle(string Key, string styleUrl)
    {
        //funkce natahuje do hlavicky HTML stranky odkaz na CSS soubor

        //zjistujeme jestli odkaz na CSS jiz existuje. Pokud ano, tak 
        if (!String.IsNullOrEmpty(Key)) if (Page.Header.FindControl(Key) != null) return;

        HtmlLink link = new HtmlLink();
        if (!String.IsNullOrEmpty(Key)) link.ID = Key;
        link.Href = styleUrl;
        link.Attributes.Add("type", "text/css");
        link.Attributes.Add("rel", "stylesheet");
        Page.Header.Controls.Add(link);
    }

    private string RandomString(int length)
    {
        const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrtstuvwxyz0123456789";
        var random = new Random();
        return new string(Enumerable.Repeat(chars, length)
          .Select(s => s[random.Next(s.Length)]).ToArray());
    }
}