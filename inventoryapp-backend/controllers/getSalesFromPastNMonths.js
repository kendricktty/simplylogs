const getSalesFromPast12Months = () => {
    const months_before = 4
    const upper = new Date();
    const lower = new Date();
    lower.setMonth(upper.getMonth() - months_before);
    console.log(upper >= lower)
    console.log(`Upper: ${upper}; Lower: ${lower}`)

    
}
getSalesFromPast12Months()