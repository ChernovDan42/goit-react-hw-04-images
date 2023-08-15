
import { Component } from 'react'
import css from './App.module.css'
import { Searchbar } from './Searchbar/Searchbar'
import fetchImages from './servises/pixabayAPI'
import {ImageGallery} from './ImageGallery/ImageGallery'
import { Button } from './Button/Button'
import { Loader } from './Loader/Loader'
import { Modal } from './Modal/Modal'
import Notiflix from 'notiflix';


export class App extends Component{

  state = {
    searchQuery: '',
    page: 1,
    images: [],
    loader: false,
    showModal: false,
    selectedPhoto: null,
    showBtn: false,

  }

  componentDidUpdate(prevProps, prevState) {

    const { searchQuery, page } = this.state

    if (prevState.searchQuery !== searchQuery) {
      this.scrollToTop()
      this.setState({loader:true})
      fetchImages(searchQuery.trim(), page).then(({data:{totalHits,hits}}) => {
       
        const maxPage = Math.ceil(totalHits / hits.length)

        if (totalHits === 0) {
          return Notiflix.Notify.warning('We have no match');
        }
   
        if (maxPage === page) {
         this.setState({showBtn:false})
        } else {
          this.setState({showBtn:true})
        }

        this.setState({ images: [...hits] })
        })
        .catch(error => {
          console.log(error.message)
          
         
        })
        .finally(() => this.setState(
          { loader: false }
        ))

    }
    

    if (prevState.page !== this.state.page) {
      this.setState({loader:true})
      fetchImages(searchQuery, page)
        .then(({ data: { hits, totalHits } }) => {
          
         
          if (hits.length < 12) {
            this.setState({showBtn:false})
          }

          this.setState(prevState => (
            { images: [...prevState.images, ...hits] }
          ))
        })
        .catch(error => {
          console.log(error.message)
         
        })
        .finally(() => this.setState({ loader: false }))
    
    }
        
  }

  onFormSubmit = (value) => {
    if (this.state.searchQuery === value) {
      return
    }
     this.setState({ searchQuery: value,page:1})
   }
  
  onLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }))
  }

  toggleModal = () => {
    this.setState(({ showModal })=>({
      showModal: !showModal
    }))
  }

  onPhotoClick = (url) => {
    this.setState({ selectedPhoto: url,showModal:true })
    
  }

  scrollToTop() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
  
  render(){

    const {images,showModal,selectedPhoto,loader,showBtn}=this.state

  return (
    <div className={css.App}>
      <Searchbar onSubmit={this.onFormSubmit} />
      <ImageGallery images={images} onPhotoClick={this.onPhotoClick } />
      {showModal && <Modal onClose={this.toggleModal}><img src={selectedPhoto} alt="popa" /></Modal>}
      {loader && <Loader/>}
      {showBtn && <Button loadMore={this.onLoadMore } />}
    </div>
  );
}

  
};
