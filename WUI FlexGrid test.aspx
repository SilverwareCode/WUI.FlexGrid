<%@ Page Language="C#" AutoEventWireup="true" CodeFile="WUI FlexGrid test.aspx.cs" Inherits="WUI_FlexGrid_test" %>

<%@ Register Src="~/Controls/WUI.FlexGridControl.ascx" TagPrefix="uc1" TagName="WUIFlexGridControl" %>


<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
        <div>
            <uc1:WUIFlexGridControl runat="server" ID="WUIFlexGridControl" DataIntegrationScript="<script src='/js/Data.js'></script>" EventListenerScript="<script>window.addEventListener('eventDataSourceUpdated', function (e) {console.log('UPDATED data:');console.dir(e.detail)}, false);</script>" />
        </div>
    </form>
</body>
</html>
