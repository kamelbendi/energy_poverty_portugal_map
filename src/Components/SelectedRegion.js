
import './SelectedRegion.css';

function SelectedRegion({regionFromButtonToMap}) {
    

    const changeToRawMap = () => {
        regionFromButtonToMap("");
    }
    
    const changeToDataOfDistricts = () => {
        regionFromButtonToMap("districts");
    }
    const changeToDataOfMunicipalities = () => {
        regionFromButtonToMap("municipalities");
    }
    const changeToDataOfCivilParishes = () => {
        regionFromButtonToMap("civilParishes");
    }
    return ( 
        <>
            <div className="dropdown">
                  <button className="dropbtn">Select region</button>
                    <div className="dropdown-content">
                      <button onClick={changeToRawMap}>Raw Map</button>
                      <button onClick={changeToDataOfDistricts}> Districts </button>
                      <button onClick={changeToDataOfMunicipalities}> Municipalities </button>
                      <button onClick={changeToDataOfCivilParishes}> Civil Parishes </button>
                  </div>
              </div>
        </>
     );
}

export default SelectedRegion;