class Individual {
  constructor(aAge, aIsMale) {
    this.age = aAge;
    this.isMale = aIsMale;
  }
}

class PopulationPyramid {
  constructor() {
    this.females = new Map();
    this.males = new Map();

    for (let i = 0; i < 120; i += 5) {
      this.females.set(i, 0);
      this.males.set(i, 0);
    }
  }
}

const mockPopulationData = (aPopulationSize) => {
  const retPopulationDataArray = new Array();
  for (let i = 0; i < aPopulationSize; i++) {
    const age = Math.random() * 120;
    const isMale = Math.random() > 0.5;
    const newIndividaul = new Individual(age, isMale);
    retPopulationDataArray.push(newIndividaul);
  }
  return retPopulationDataArray;
};

const printPopulationPyramid = (aPopulationPyramid) => {
  for (let i = 0; i < 120; i += 5) {
    const femalesCount = aPopulationPyramid.females.get(i);
    const malesCount = aPopulationPyramid.males.get(i);
    const ident = i < 10 ? '\t\t' : '\t';
    console.log(`For age ${i} - ${i + 5} ${ident}: F = ${femalesCount} , M = ${malesCount}`);
  }
};

const createPopulationPyramid = (aPopulationDataArray) => {
  const newPopulationPyramid = new PopulationPyramid();
  aPopulationDataArray.forEach( (individual) => {
    const age = individual.age;
    let ageLevel = Math.floor(age / 5) * 5;
    if(ageLevel > 115 ){
      ageLevel = 115
    }
    const genderMap = individual.isMale ? newPopulationPyramid.males : newPopulationPyramid.females;
    genderMap.set(ageLevel, genderMap.get(ageLevel) + 1);
  });
  return newPopulationPyramid;
};

const populationSize = 1000000;
const mockPopulationDataArray = mockPopulationData(populationSize);
const populationPyramid = createPopulationPyramid(mockPopulationDataArray);
printPopulationPyramid(populationPyramid);

