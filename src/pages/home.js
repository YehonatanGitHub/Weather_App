import React from 'react'
import axios from 'axios'
import { Modal, ModalHeader, ModalBody } from 'reactstrap'
import './style.css'

class Home extends React.Component {
  constructor() {
    super()
    this.state = {
      apiKey: 'vFpvo92SL4z6aJsThIdkQDJZe1oOnEO3',
      fiveDays: [],
      cityPhrase: '',
      defaultCity: 'Tel Aviv',
      cityMaxTemp: '',
      search: '',
      cityId: '',
      modalIsOpen: false,
      citySearchResArr: [],
      followBotton: false,
      listOfFollowers: [],
    }
    this.getDayOfWeek = this.getDayOfWeek.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleClickSearch = this.handleClickSearch.bind(this)
    this.toggleModal = this.toggleModal.bind(this)
    this.handleClickModal = this.handleClickModal.bind(this)
    this.followOnOff = this.followOnOff.bind(this)
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.cityId !== this.state.cityId && this.state.cityId) {
      this.changeCityUi()

      // https://reactjs.org/docs/react-component.html#componentdidupdate
    }
  }

  componentDidMount() {
    let tempArr = JSON.parse(localStorage.getItem('listOfFollowers'))
    console.log('result from find serach array', tempArr)
    if (tempArr === undefined || tempArr === null || tempArr.length === 0) {
      this.setState({ cityId: 215854 })
      this.setState({ defaultCity: 'Tel Aviv' })
      setTimeout(() => {
        this.changeCityUi()
      }, 1000)
    } else {
      let setCity = tempArr.find((search) => search.fromFavorits === 1)
      console.log('result from find serach array', setCity)
      if (setCity) {
        this.setState({ cityId: setCity.cityId })
        this.setState({ defaultCity: setCity.defaultCity })
        this.setState({ followBotton: true })
        let objIndex = tempArr.findIndex((search) => search.cityId === setCity.cityId)
        tempArr[objIndex].fromFavorits = 0
        console.log('find in array setCity', setCity)
        console.log('find in array tempArr ', tempArr)
        console.log('in if cityId', this.state.cityId)
        localStorage.setItem('listOfFollowers', JSON.stringify(tempArr))
        setTimeout(() => {
          this.changeCityUi()
        }, 1000)
      } else if (tempArr.find((search) => search.cityId === 215854)) {
        this.setState({ cityId: 215854 })
        this.setState({ defaultCity: 'Tel Aviv' })
        this.setState({ followBotton: true })
        setTimeout(() => {
          this.changeCityUi()
        }, 1000)
      }
    }
    alert('Plesae enabel CORS for this site to work https://cors-anywhere.herokuapp.com/')
    // var url = `https://dataservice.accuweather.com/forecasts/v1/daily/5day/${this.state.cityId}?apikey=${this.state.apiKey}&language=en-us&details=false&metric=true`;
    // axios({
    //   method: "get",
    //   url: `https://cors-anywhere.herokuapp.com/${url}`,
    //   headers: { Origin: `${url}` }
    // }).then(res => {
    //   console.log("axios res.data", res.data.DailyForecasts);
    //   const fiveDays = res.data.DailyForecasts;
    //   this.setState({ fiveDays });
    //   const cityPhrase = fiveDays[0].Day.IconPhrase;
    //   this.setState({ cityPhrase });
    //   const cityMaxTemp = fiveDays[0].Temperature.Maximum.Value;
    //   this.setState({ cityMaxTemp });
    //   console.log("componentDidMount");
    //   console.log("this.state.cityId", this.state.cityId);
    //   console.log("cityMaxTemp", this.state.cityMaxTemp);
    // });
  }
  changeCityUi() {
    var url = `https://dataservice.accuweather.com/forecasts/v1/daily/5day/${this.state.cityId}?apikey=${this.state.apiKey}&language=en-us&details=false&metric=true`
    axios({
      method: 'get',
      url: `https://cors-anywhere.herokuapp.com/${url}`,
      headers: { Origin: `${url}` },
    }).then((res) => {
      const fiveDays = res.data.DailyForecasts
      this.setState({ fiveDays })
      const cityPhrase = fiveDays[0].Day.IconPhrase
      this.setState({ cityPhrase })
      const cityMaxTemp = fiveDays[0].Temperature.Maximum.Value
      this.setState({ cityMaxTemp })
      console.log('changeCityUi')
      console.log('this.state.cityId', this.state.cityId)
      console.log('cityMaxTemp', cityMaxTemp)
    })
  }
  getDayOfWeek(date) {
    var dayOfWeek = new Date(date).getDay()
    return isNaN(dayOfWeek) ? null : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][dayOfWeek]
  }
  handleSubmint(event) {
    event.preventDefault()
  }
  handleInputChange(event) {
    event.preventDefault()
    this.setState({ search: event.target.value })
  }
  handleClickSearch(event) {
    event.preventDefault()
    //send search city and gets back cityId
    var url = `https://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${this.state.apiKey}&q=${this.state.search}&language=en-us/cors-anywhere.html`
    axios({
      method: 'get',
      url: `https://cors-anywhere.herokuapp.com/${url}`,
      headers: { Origin: `${url}` },
    }).then((res) => {
      const citySearchRes = res.data
      console.log('citySearchRes')
      console.log(citySearchRes)
      if (citySearchRes.length === 1) {
        console.log('citySearchRes[0].Key', citySearchRes[0].Key)
        this.setState({ defaultCity: citySearchRes[0].LocalizedName })
        this.setState({ cityId: parseInt(citySearchRes[0].Key, 10) })
        let tempArray = JSON.parse(localStorage.getItem('listOfFollowers'))
        let setCity = tempArray.find(
          (search) => search.cityId === parseInt(citySearchRes[0].Key, 10)
        )
        if (setCity) {
          this.setState({ followBotton: true })
        } else {
          this.setState({ followBotton: false })
        }

        this.changeCityUi()
        this.setState({ search: '' })
      } else if (citySearchRes.length === 0) {
        alert('no city found please try another')
        this.setState({ search: '' })
      } else {
        this.toggleModal()
        this.setState({ citySearchResArr: citySearchRes })
        console.log('this.state.cityId', this.state.cityId)
      }
    })
  }
  toggleModal() {
    this.setState({ modalIsOpen: !this.state.modalIsOpen })
  }

  handleClickModal = (e, data) => {
    this.setState({
      defaultCity: data.LocalizedName,
    })
    this.setState(
      { cityId: parseInt(data.Key, 10) },
      function stateUpdateComplete() {
        console.log('check this', this.state.cityId)
        this.changeCityUi()
      }.bind(this)
    )
    this.toggleModal()
    this.setState({ search: '' })
    let tempArray = JSON.parse(localStorage.getItem('listOfFollowers'))
    console.log('listOfFollowers', tempArray)
    let setCity = tempArray.find((search) => search.cityId === parseInt(data.Key, 10))
    if (setCity) {
      this.setState({ followBotton: true })
    } else {
      this.setState({ followBotton: false })
    }
  }

  followOnOff() {
    if (this.state.followBotton === true) {
      let arrTemp = JSON.parse(localStorage.getItem('listOfFollowers'))
      console.log(arrTemp)
      var findIdToRemove = arrTemp.findIndex((x) => x.cityId === this.state.cityId)
      console.log(findIdToRemove)
      arrTemp.splice(findIdToRemove, 1)
      console.log(arrTemp)
      localStorage.setItem('listOfFollowers', JSON.stringify(arrTemp))
      this.setState({ followBotton: false })
    } else if (this.state.followBotton === false) {
      //if localStorage is emplty enter new follower
      if (JSON.parse(localStorage.getItem('listOfFollowers')) === null) {
        console.log('local is null')
        var newFollower = [
          {
            fromFavorits: 0,
            cityId: this.state.cityId,
            defaultCity: this.state.defaultCity,
            cityMaxTemp: this.state.cityMaxTemp,
            cityPhrase: this.state.cityPhrase,
          },
        ]
        this.setState({ followBotton: true })
        localStorage.setItem('listOfFollowers', JSON.stringify(newFollower))
        console.log('this.state.cityId newFollower', newFollower)
      } else {
        //get localStorage and add new follower
        let temp = JSON.parse(localStorage.getItem('listOfFollowers'))
        console.log('temp', temp)
        var newFollower2 = {
          fromFavorits: 0,
          cityId: this.state.cityId,
          defaultCity: this.state.defaultCity,
          cityMaxTemp: this.state.cityMaxTemp,
          cityPhrase: this.state.cityPhrase,
        }
        temp.push(newFollower2)
        console.log('temp2', temp)
        console.log('this.state.cityId newFollower2', newFollower2)

        localStorage.setItem('listOfFollowers', JSON.stringify(temp))
        this.setState({ followBotton: true })
      }
    }
  }

  render() {
    const divStyle = {
      paddingRight: '7px',
      paddingLeft: '7px',
      border: '6px solid #ffffff',
      borderRadius: '16px',
      backgroundColor: '#dddddd9c',
    }

    const buttonStyle = {
      width: '45px',
      height: '45px',
      lineHeight: '45px',
      textAlign: 'center',
      padding: 0,
      borderRadius: '50%',
      fontWeight: 'bold',
    }
    const cityNameRow = {
      marginLeft: '2%',
      marginRight: '0%',
    }
    const cardBody = {
      paddingLeft: '25px',
      paddingRight: '25px',
    }
    const card = {
      width: '115px',
    }
    return (
      <div className='main'>
        <Modal isOpen={this.state.modalIsOpen}>
          <ModalHeader toggle={this.toggleModal.bind(this)}>
            We found more than one result. Please select from list:{' '}
          </ModalHeader>
          <ModalBody>
            {this.state.citySearchResArr.map((city) => {
              console.log('city.LocalizedName', city.LocalizedName)

              return (
                <p
                  onClick={(e) => this.handleClickModal(e, city)}
                  id={city.Key}
                  key={city.Key}
                  className='list-group-item list-group-item-action'>
                  {city.LocalizedName}, {city.AdministrativeArea.LocalizedName},{' '}
                  {city.Country.LocalizedName}
                </p>
              )
            })}
          </ModalBody>
        </Modal>
        {/* search box */}
        <div className='container'>
          <br />
          <div className='row justify-content-center'>
            <div className='col-12 col-md-10 col-lg-8'>
              <form className='card card-sm' onSubmit={this.handleSubmint}>
                <div
                  className='card-body row no-gutters align-items-center'
                  style={{
                    padding: '7px',
                  }}>
                  <div className='col-auto'>
                    <i className='fas fa-search h4 text-body' />
                  </div>
                  <div className='col'>
                    <input
                      className='form-control form-control-lg form-control-borderless'
                      type='search'
                      placeholder='Search For A City'
                      value={this.state.search}
                      name='search'
                      onChange={this.handleInputChange}
                    />
                  </div>
                  <div className='col-auto'>
                    <button
                      className='btn btn-lg btn-success'
                      onClick={this.handleClickSearch}
                      style={{
                        marginLeft: '6px',
                      }}>
                      Search
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        {/* Body */}
        <div className='container'>
          <br />
          <br />
          <div className='container' style={divStyle}>
            <br />
            <div className='row' style={cityNameRow}>
              <div className='col-sm-6'>
                <h2>{this.state.defaultCity}</h2>
                <h5>{this.state.cityMaxTemp + '° c'}</h5>
              </div>
              <div className='col-sm-6 '>
                <button
                  id={this.state.cityId}
                  style={buttonStyle}
                  className={
                    this.state.followBotton
                      ? 'btn btn-success btn-circle btn-circle-sm m-1 float-right ml-auto'
                      : 'btn btn-secondary btn-circle btn-circle-sm m-1 float-right ml-auto'
                  }
                  onClick={this.followOnOff}>
                  <i className='fa fa-check' style={buttonStyle} />
                </button>
                <span className='favorite_text'>
                  {this.state.followBotton
                    ? 'Click to Remove from Favorites'
                    : 'Click to Add to Favorites'}
                </span>
              </div>
            </div>
            <br />
            <br />
            <div className='row justify-content-center'>
              <div className='col-sm-3'>
                <h4 className='justify-content-center'>{this.state.cityPhrase}</h4>
              </div>
            </div>
            <br />
            <br />
            {/* 5 day forcast */}
            <div className='row justify-content-center'>
              <div className='card-deck'>
                {this.state.fiveDays.map((day, i) => {
                  console.log('map 5 days ', this.state.cityPhrase)

                  return (
                    <div className='card text-white bg-info' style={card} key={i}>
                      <div className='card-body text-center' style={cardBody}>
                        <h5 className='card-text'>
                          {this.getDayOfWeek(new Date(day.Date).toLocaleDateString())}
                        </h5>
                        <h6 className='card-text'>{day.Temperature.Maximum.Value + '° c'}</h6>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
            <br />
          </div>
        </div>
      </div>
    )
  }
}

export default Home
