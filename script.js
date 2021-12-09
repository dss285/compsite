var rawxp = (prestige, xp) => {
    return ((2**prestige)*xp)+((2**prestige-1)*200000000)
}
var loadXPData = async(file) => {
    var data = await fetch(file)
    if (data) {
        return await data.json()
    }
    return null
}

var initialize = (xpData) => {
    
    var skillCalcs = document.querySelectorAll(".comp-skill-calc")
    for(var x of skillCalcs) {
        var skillSelect = document.createElement("select")
        if(xpData) {
            console.log(xpData)
            for(let skill in xpData) {
                var op = document.createElement("option")
                op.innerHTML = skill
                op.value = skill

                skillSelect.appendChild(op)
            }
        }
        
        var prestigeLabel = document.createElement('p')
        prestigeLabel.innerHTML = "Prestiges current/goal:"
        var prestigeSliderCurrent = document.createElement('input');
        prestigeSliderCurrent.type = "range";
        prestigeSliderCurrent.min = 1;
        prestigeSliderCurrent.max = 20;
        prestigeSliderCurrent.value = 1;
        var prestigeOutputCurrent = document.createElement('input')
        prestigeOutputCurrent.type = "text"
        prestigeOutputCurrent.value = 1
        prestigeSliderCurrent.addEventListener("input",() => {
            prestigeOutputCurrent.value = prestigeSliderCurrent.value;
        })
        var prestigeSliderGoal = document.createElement('input');
        prestigeSliderGoal.type = "range";
        prestigeSliderGoal.min = 1;
        prestigeSliderGoal.max = 20;
        prestigeSliderGoal.value = 1;
        var prestigeOutputGoal = document.createElement('input')
        prestigeOutputGoal.type = "text"
        prestigeOutputGoal.value = 1
        prestigeSliderGoal.addEventListener("input",() => {
            prestigeOutputGoal.value = prestigeSliderGoal.value;
        })
        
        
        
        var xpLabel = document.createElement('p')
        xpLabel.innerHTML = "XP current/goal:"
        var xpSliderCurrent = document.createElement('input');
        xpSliderCurrent.type = "range";
        xpSliderCurrent.min = 0;
        xpSliderCurrent.max = 200000000;
        xpSliderCurrent.value = 0;
        var xpOutputCurrent = document.createElement('input')
        xpOutputCurrent.type = "text"
        xpOutputCurrent.value = 0
        xpSliderCurrent.addEventListener("input",() => {
            console.log(xpSliderCurrent.value)
            xpOutputCurrent.value = xpSliderCurrent.value;
        })
        var xpSliderGoal = document.createElement('input');
        xpSliderGoal.type = "range";
        xpSliderGoal.min = 0;
        xpSliderGoal.max = 200000000;
        xpSliderGoal.value = 0;
        var xpOutputGoal = document.createElement('input')
        xpOutputGoal.type = "text"
        xpOutputGoal.value = 0
        xpSliderGoal.addEventListener("input",() => {
            xpOutputGoal.value = xpSliderGoal.value;
        })
        var calculate = () => {
            var ele = document.createElement("div")
            var skill = skillSelect.value
            console.log("asd1")
            var currXP = rawxp(prestigeOutputCurrent.value, xpOutputCurrent.value)
            var goalXP = rawxp(prestigeOutputGoal.value, xpOutputGoal.value)
            console.log("asd2")
            for(var xpitem in xpData[skill]) {
                var xpPerItem = xpData[skill][xpitem]
                var liEle = document.createElement("li")
                
                liEle.innerHTML = `<h4>${xpitem}</h4>${Math.ceil((goalXP-currXP)/xpPerItem)}x for the goal`
                ele.appendChild(liEle)
            }
            ele.appendChild(document.createElement("hr"))
            return ele
        }
        var calculations = document.createElement("div")
        calculations.classList.add("calculations")
        var calculateBtn = document.createElement("button")
        calculateBtn.innerHTML="Calculate"
        calculateBtn.addEventListener("click", () => {
            calculations.prepend(calculate())
        })

        
        x.appendChild(skillSelect)
        x.appendChild(prestigeLabel)
        x.appendChild(prestigeSliderCurrent)
        x.appendChild(prestigeOutputCurrent)
        x.appendChild(prestigeSliderGoal)
        x.appendChild(prestigeOutputGoal)
        x.appendChild(xpLabel)
        x.appendChild(xpSliderCurrent)
        x.appendChild(xpOutputCurrent)
        x.appendChild(xpSliderGoal)
        x.appendChild(xpOutputGoal)
        
        x.appendChild(calculateBtn)
        x.appendChild(calculations)
    }

}
loadXPData("https://dss285.github.io/compsite/new_data.json").then((data) => {
    initialize(data)
})
