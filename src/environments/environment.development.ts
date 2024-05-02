export const environment = {
    isProduction: false,
    // supposing you have a backend where to send some requests
    //backendUrl: "http://127.0.0.1:8000",

    // Note that this is NOT sensitive information
    firebaseConfig: {
        projectId:"sala-de-juegos-utn",
        appId:"1:1068695128805:web:a4f699df2cbd9328c4620c",
        storageBucket:"sala-de-juegos-utn.appspot.com",
        apiKey:"AIzaSyBNCRRnTt3Y79-bodKhzutzPy3YPA_ZwD4",
        authDomain:"sala-de-juegos-utn.firebaseapp.com",
        messagingSenderId:"1068695128805",
    },

    testUsersCredentials: [
        {
            'email':'',
            'password':''
        },
        {
            'email':'admin@admin.com',
            'password':'admin123'
        },
        {
            'email':'test@test.com',
            'password':'test123'
        },
        {
            'email':'user@user.com',
            'password':'user123'
        },
    ],
  };