import {DirectoryBody, DirectoryContainer, BackgroundImage} from './directory-item.style';
const DirectoryItem= ({category})=>{
    const {id,title,imageUrl}=category;
    return(
    <DirectoryContainer key={id}>
        <BackgroundImage imageUrl={imageUrl}/>
        <DirectoryBody>
          <h2>{title}</h2>
          <p>Shop Now</p>
        </DirectoryBody>
      </DirectoryContainer>
      )
}
export default DirectoryItem;