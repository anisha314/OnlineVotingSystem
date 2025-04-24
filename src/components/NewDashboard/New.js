import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import NewDashBoard from "./scenes/dashboard/NewDashBoard";
import './New.css'


/*

*/
function New() {
    const [theme, colorMode] = useMode();
    return (<ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <div className="appNew">
                <Sidebar />
                <main className="content">
                    <Topbar />
                    <NewDashBoard />
                </main>
            </div>
        </ThemeProvider>
    </ColorModeContext.Provider>

    )
}

export default New;