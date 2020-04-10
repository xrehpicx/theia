onmessage = (data) => {

    let new_aSpeed = data.data.speed * Math.cos(data.data.angularVelocity * 2 * (data.data.angularVelocity < 0) * 3.1415926535897932384626 / 510);
    let new_bSpeed = data.data.speed * Math.cos(data.data.angularVelocity * 2 * (data.data.angularVelocity >= 0) * 3.1415926535897932384626 / 510);
    
    postMessage({
        new_aSpeed, new_bSpeed
    })
}