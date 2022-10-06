import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

import { LoadingContainer, StyledLoadingMessage, Rotate } from "./LoadingPopup.style"
import StyledPopup  from "../StyledPopup"

function LoadingPopup ({ title="Loading..." }) {
    return (
        <StyledPopup open={true}>
            <LoadingContainer>
                <StyledLoadingMessage title={title} />
                <Rotate>
                    <FontAwesomeIcon icon={faSpinner} />
                </Rotate>
            </LoadingContainer>
        </StyledPopup>

    )
}

export default LoadingPopup