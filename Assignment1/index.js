const fs = require("fs");
const data = fs.readFileSync("NEOWISE_Dataset.json", "utf8");

const neoWiseData = JSON.parse(data);

function getNeoWiseData(index) {
  return neoWiseData[index];
}

console.log(getNeoWiseData(0));

function specificNeo(orbit_class, pha, neoWiseProperty) {
  const apolloOrbitClass = [];
  //let hmagTotal = 0;
  let propertyTotal = 0;
  let specificOrbitCount = 0;
  //let hmagData = [];
  let newoWisePropertyData = [];
  

  for (i = 0; i < neoWiseData.length; i++) {
    const data = neoWiseData[i];
    if (data.orbit_class === orbit_class && data.pha === pha) {
      apolloOrbitClass.push(neoWiseData[i]);
      newoWisePropertyData.push(data[neoWiseProperty]);
      propertyTotal += data[neoWiseProperty];
      specificOrbitCount++;
    }
  }
  console.log(`"newoWisePropertyData:"${newoWisePropertyData}`);
  console.log("Total" + orbit_class + " NEOs: " + specificOrbitCount);
  console.log("Average of " + neoWiseProperty + ": " + propertyTotal / specificOrbitCount);
  console.log("Max of " + neoWiseProperty + ": " + Math.max(...newoWisePropertyData));
  console.log("Min of " + neoWiseProperty + ": " + Math.min(...newoWisePropertyData));
  return apolloOrbitClass;
}

console.table(specificNeo("Apollo", true, "i_deg"));
console.table(specificNeo("Aten", true, "i_deg"));
