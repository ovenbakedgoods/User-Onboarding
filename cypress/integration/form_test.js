import {cypress as cy} from cypress

describe("Testing form inputs", () => {
    it("visits localhost", () => {
        cy.visit("http://localhost:3000")
    })
});