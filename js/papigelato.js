const ice = {"balls" : 0, "cup" : 0, "cone" : 0, "liter" : 0};
const toppings = {"toppings" : 0};
const choice = ["A", "B", "C", "D"];
const prices = {"balls" : 0.95, "cup" : 0.75, "cone" : 1.25, "liter" : 9.80};
const totalStuff = {"balls" : 0, "cone" : 0, "cup" : 0, "toppings" : 0, "price" : 0};
var icePlacement;
var strQuantity;

// Creating functions
function typeClient() {
    var client = prompt("Bent u 1) particulier of 2) zakelijk?");
    if (client == 1) {
        quantityBalls();
    } else if (client == 2) {
        business();
    } else {
        alert("Kies een gegeven optie");
        typeClient();
    }
}

function business() {
    var iceLiter = prompt("Hoeveel liter ijs wilt u?");
    ice["liter"] = iceLiter;
    for (i = 1; i <= ice["liter"]; i++) {
        var iceFlavour = prompt("Welke smaak wilt u voor " + i + " liter ijs? A) Aardbei, C) chocolade of V) vanille?").toUpperCase();
    }
    makeReceipt(2);
}

function quantityBalls() {
    var strQuantity = prompt("Hoeveel bolletjes wilt u?");
    ice["balls"] += parseInt(strQuantity);

    if (ice["balls"] >= 4 && ice["balls"] <= 8) {
        alert("Dan krijgt u een bakje met " + ice["balls"] + " bolletjes van mij");
        icePlacement = "B";
        ice["cup"] += 1;
        flavour();
    } else if (parseInt(strQuantity) > 8) {
        alert("Sorry, zulke grote bakken hebben we niet");
        quantityBalls();
    } else {
        flavour();
    }
}

function flavour() {
    for (i = 1; i <= ice["balls"]; i++) {
        var iceFlavour = prompt("Welke smaak wilt u voor bolletje " + i + "? A) Aardbei, C) chocolade of V) vanille?").toUpperCase();
        switch (iceFlavour) {
            case "A":
               continue;
            case "C":
                continue;
            case "V":
                continue;
            default:
                alert("Kies een gegeven optie");
                flavour();
        }
    }
    if (icePlacement) {
        topping();
    } else {
        placement();
    }
}

function placement() {
    var icePlacement = prompt("Wilt u deze " + ice["balls"] + " bolletjes in A) een hoorntje of B) een bakje? ").toUpperCase();
    switch (icePlacement) {
        case "A":
            ice["cone"] += 1;
            topping();
            break;
        case "B":
            ice["cup"] += 1;
            topping();
            break;
        default:
            alert("Kies een gegeven optie");
            placement();
    }
}

function topping() { 
    var iceTopping = prompt("Wat voor topping wilt u: A) Geen, B) slagroom, C) sprinkels of D) caramel saus?").toUpperCase();
    if (choice.includes(iceTopping)) {
        if (iceTopping != "A") {
            toppings["toppings"] += 1;
            orderContinue(); 
        } else {
            orderContinue(); 
        }
    } else {
        alert("Kies een gegeven optie");
        topping(); 
    }
}

function orderContinue() { 
    if (ice["cone"]) {
        var stopOrGo = prompt("Hier is uw hoorntje met " + ice["balls"] + " bolletjes. Wilt u nog meer bestellen? (Y/N)").toUpperCase();
    } else {
        var stopOrGo = prompt("Hier is uw bakje met " + ice["balls"] + " bolletjes. Wilt u nog meer bestellen? (Y/N)").toUpperCase();
    }


    if (stopOrGo == "Y") {
        totalStuff["balls"] += ice["balls"];
        totalStuff["cone"] += ice["cone"];
        totalStuff["cup"] += ice["cup"];
        totalStuff["toppings"] += toppings["toppings"];

        ice["balls"] = 0;
        ice["cone"] = 0;
        ice["cup"] = 0;
        toppings["toppings"] = 0;

        quantityBalls();
    } else if (stopOrGo == "N") {
        totalStuff["balls"] += ice["balls"];
        totalStuff["cone"] += ice["cone"];
        totalStuff["cup"] += ice["cup"];
        totalStuff["toppings"] += toppings["toppings"];
        makeReceipt(1);
    } else {
        alert("Kies een gegeven optie")
        orderContinue();
    }
}

function makeReceipt(type) {
    if(type == 1) {
        totalStuff["price"] = 0 

        const title = document.createElement("h2");
        title.innerText = "--------[ Papi Gelato ]--------";
        document.body.appendChild(title);

        const receipt = document.createElement("p");
        document.body.appendChild(receipt);
        
        totalStuff["price"]+= (totalStuff["balls"] * prices["balls"]);
        receipt.innerText = "Prijs bolletjes: " + totalStuff["balls"] + " x €"+ prices["balls"] + " = €" + (totalStuff["balls"] * prices["balls"]).toFixed(2);
        receipt.innerHTML += "<br>";

        if (ice["cone"] > 0) {
            totalStuff["price"] += (ice["cone"] * prices["cone"]);
            receipt.innerText += "Prijs hoorntje(s): " + ice["cone"] + " x €"+ prices["cone"] + " = €" + (ice["cone"] * prices["cone"]).toFixed(2);
            receipt.innerHTML += "<br>";
        }

        if (ice["cup"] > 0) {
            totalStuff["price"] += (ice["cup"] * prices["cup"]);
            receipt.innerText += "Prijs bakje(s): " + ice["cup"] + " x €"+ prices["cup"] + " = €" + (ice["cup"] * prices["cup"]).toFixed(2);
            receipt.innerHTML += "<br>";
        }

        if (toppings["toppings"] > 0) {
            totalStuff["price"] += (toppings["toppings"] * 0.50);
            receipt.innerText += "Prijs topping: " + toppings["toppings"] + " x €"+ 0.50 + " = €" + (toppings["toppings"] * 0.50).toFixed(2);
            receipt.innerHTML += "<br>";
        }

        receipt.innerText += "Totale prijs: €" + totalStuff["price"];
    } else if (type ==2) {
        const title = document.createElement("h2");
        title.innerText = "--------[ Papi Gelato ]--------";
        document.body.appendChild(title);

        const receipt = document.createElement("p");
        document.body.appendChild(receipt);

        receipt.innerText = "Liter ijs: " + ice["liter"] + "L x €" + prices["liter"] + " = €" + (ice["liter"] * prices["liter"]).toFixed(2);
    }
}

typeClient();