const createAgeLevelsArray = () => {
    return Array(24).fill(5).map((value, index) => value * index);
};

const ageLevelsArray = createAgeLevelsArray();

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

        ageLevelsArray.forEach((value) => {
            this.females.set(value, 0);
            this.males.set(value, 0);
        });
    }
}

const mockPopulationData = (aPopulationSize) => {
    return Array(aPopulationSize).fill(null).reduce(
        (previousValue) => {
            const age = Math.random() * 120;
            const isMale = Math.random() > 0.5;
            const newIndividual = new Individual(age, isMale);
            previousValue.push(newIndividual);
            return previousValue;
        }, new Array());
    const retPopulationDataArray = new Array();
};

const printPopulationPyramid = (aPopulationPyramid) => {
    ageLevelsArray.reduce((accumulator, value) => {
        const femalesCount = aPopulationPyramid.females.get(value);
        const malesCount = aPopulationPyramid.males.get(value);
        const ident = value < 10 ? '\t\t' : '\t';
        console.log(`For age ${value} - ${value + 5} ${ident}: F = ${femalesCount} , M = ${malesCount}`);
    });
};

const createPopulationPyramid = (aPopulationDataArray) => {
    return aPopulationDataArray.reduce((accumulator, individualValue) => {
        const age = individualValue.age;
        let ageLevel = Math.floor(age / 5) * 5;
        if (ageLevel > 115) {
            ageLevel = 115;
        }
        const genderMap = individualValue.isMale ? accumulator.males : accumulator.females;
        const currentValue = genderMap.get(ageLevel);
        if (currentValue != null && currentValue != undefined) {
            genderMap.set(ageLevel, currentValue + 1);
        } else {
            console.error(`Non existing age level : ${ageLevel}`);
        }

        return accumulator;
    }, new PopulationPyramid());
};

// const populationSize = 1000000;
// const mockPopulationDataArray = mockPopulationData(populationSize);
// const populationPyramid = createPopulationPyramid(mockPopulationDataArray);
// printPopulationPyramid(populationPyramid);

module.exports = {
    Individual,
    PopulationPyramid,
    ageLevelsArray,
    mockPopulationData,
    createPopulationPyramid
};
