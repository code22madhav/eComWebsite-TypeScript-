import {DirectoryBody, DirectoryContainer, BackgroundImage} from './directory-item.style';
import { useNavigate } from 'react-router-dom';
const DirectoryItem= ({category})=>{
    const navigate=useNavigate();
    const {id,title,imageUrl, route}=category;
    const onClickhandler=()=> navigate(route);
    return(
    <DirectoryContainer key={id} onClick={onClickhandler}>
        <BackgroundImage imageUrl={imageUrl}/>
        <DirectoryBody>
          <h2>{title}</h2>
          <p>Shop Now</p>
        </DirectoryBody>
      </DirectoryContainer>
      )
}
export default DirectoryItem;