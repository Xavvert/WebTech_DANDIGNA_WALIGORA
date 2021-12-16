/** @jsxImportSource @emotion/react */
// Layout
import { useTheme } from '@mui/styles';

const useStyles = (theme) => ({
    mainSettings: {
        margin: "10px",
        width: "100%",
        display: "flex",
        justifyContent: "center",
    }
  })

export default function Settings() {
    const styles = useStyles(useTheme())
    return(
        <div css={styles.mainSettings}>
            <h2>Settings</h2>
        </div>
    )
}