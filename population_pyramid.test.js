const population_pyramid = require('./population_pyramid');

describe('Main tests', () => {
    test('mock', () => {
        const populationSize = 1000;
        const mockArray = population_pyramid.mockPopulationData(1000);
        mockArray.forEach((value) => {
            // expect(value).toBeTruthy();
            expect(value).toBeInstanceOf(population_pyramid.Individual);
        });
        expect(mockArray.length).toBe(populationSize);
    });

    test('create pyramid', () => {
        const populationSize = 10;
        const mockArray = population_pyramid.mockPopulationData(populationSize);
        const pyramid = population_pyramid.createPopulationPyramid(mockArray);
        expect(pyramid).toBeInstanceOf(population_pyramid.PopulationPyramid);

        const ageLevelsArrayLength = population_pyramid.ageLevelsArray.length
        expect(pyramid.males.size).toBe(ageLevelsArrayLength);
        expect(pyramid.females.size).toBe(ageLevelsArrayLength);

        let counts = Array.from(pyramid.males.values())
            .reduce((previousValue, currentValue) => previousValue + currentValue, 0);
        counts = Array.from(pyramid.females.values())
            .reduce((previousValue, currentValue) => previousValue + currentValue,counts);
        expect(counts).toBe(populationSize);
    });
});
