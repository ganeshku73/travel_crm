const isAuthenticated = async () => {
    const accessToken = await localStorage.getItem("accessToken");
    console.log(accessToken);
    if(accessToken !== null){
        return true;
    }else{
        return false;
    }
     // Change this to your actual authentication check
  };

export default isAuthenticated;
