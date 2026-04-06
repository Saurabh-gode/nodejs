

function register(callback)
{
    setTimeout(() =>
    {
        console.log("Register end.");
        callback();
    }, Math.floor(Math.random() * 5) * 1000)

    console.log("Register start.");
}

function sendEmail(callback)
{
    setTimeout(() =>
    {
        console.log("sendEmail end.");
        callback();
    }, Math.floor(Math.random() * 5) * 1000)

    console.log("sendEmail start.");
}

function login(callback)
{
    setTimeout(() =>
    {
        console.log("login end.");
        callback();
    }, Math.floor(Math.random() * 5) * 1000)

    console.log("login start.");
}

function getUserData(callback)
{
    setTimeout(() =>
    {
        console.log("getUserData end.");
        callback();
    }, Math.floor(Math.random() * 5) * 1000)

    console.log("getUserData start.");
}


register(() =>
{
    sendEmail(() =>
    {
        login(()=>{
            getUserData(()=>{
                console.log("app is working")
            })
        })
    })
})
