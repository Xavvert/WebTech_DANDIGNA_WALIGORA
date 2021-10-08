module.exports = {
    list: () => {
        new Promise((resolve) => {
            resolve([
                {
                    metric: 1,
                    timestamp: new Date('2013-11-04 14:00 UTC').getTime(),
                    value: 12
                },
                {
                    metric: 2,
                    timestamp: new Date('2013-11-04 14:30 UTC').getTime(),
                    value: 15
                }
      ])
        })
    }
}
