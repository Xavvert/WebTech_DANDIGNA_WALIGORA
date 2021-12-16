/** @jsxImportSource @emotion/react */
// Layout
import { useTheme } from '@mui/styles';

const useStyles = (theme) => ({
    createChannelWrapper: {
        margin: "10px",
        width: "100%",
        display: "flex",
        justifyContent: "center",
    }
  })

export default function CreateChannel() {
    const styles = useStyles(useTheme())
    return(
        <div css={styles.createChannelWrapper}>
            <h2>Create a new channel</h2>
        </div>
    )
}