
try {
     await AsyncStorage.getItem('@viewedOnboarding').then((value)=>{
        if (value == 'true'){
            setViewedOnboarding(true)
            }
            else {
                setViewedOnboarding(false)
            }
     })
    
    
    } catch(err) {
    console.log('Error @checkOnboarding: ', err)
    }