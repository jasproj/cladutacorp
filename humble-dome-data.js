/**
 * HUMBLE DOME WELL DATA & PRICE DATABASE
 * For integration with cladutacorp.com
 * 
 * Data sources:
 * - Well info: RRC Texas, Business Plan docs
 * - Prices: EIA Henry Hub spot prices (1993-2025)
 * 
 * Usage: Import this file and use wellData, henryHubPrices objects
 */

// ============================================
// WELL DATA
// ============================================

const wellData = {
    1: {
        name: 'BAHR #1',
        wellNumber: 1,
        api: '42-201-32323',
        lease: '148210',
        status: 'active', // active | priority | reentry
        
        // Production data
        peakMCFD: 7200,
        peakBOPD: 108,
        cumulativeBCF: 7.1,
        targetMCFD: 300,
        targetBOPD: 5,
        
        // Well info
        formation: 'Wilcox A & C',
        completionDate: '1997-06-02',
        operator: 'Redbird Oilfield Services Corp.',
        field: 'Cross Creek (Wilcox)',
        
        // Map position (percentage of container)
        mapPosition: { x: 28, y: 32 },
        
        // Work program
        workProgram: '7-stage fracture, HF acid job, and tubing replacement. Well was fractured in the Wilcox A and C sands and production has declined due to salt plugs and tubing leaks.',
        
        // Production available from texas-drilling.com (Nov 1993 - Sep 2025)
        productionDataAvailable: true,
        productionDataRange: { start: '1993-11', end: '2025-09' }
    },
    
    2: {
        name: 'BAHR #2',
        wellNumber: 2,
        api: '42-201-32365',
        lease: '155124',
        status: 'active',
        
        peakMCFD: null,
        peakBOPD: null,
        cumulativeBCF: null,
        targetMCFD: null,
        targetBOPD: null,
        
        formation: 'Wilcox',
        completionDate: null,
        operator: 'Redbird Oilfield Services Corp.',
        field: 'Cross Creek (Wilcox)',
        
        mapPosition: { x: 35, y: 38 },
        
        workProgram: 'Evaluation pending. Well data under review for workover potential.',
        
        productionDataAvailable: false,
        productionDataRange: null
    },
    
    3: {
        name: 'BAHR #3',
        wellNumber: 3,
        api: '42-201-32417',
        lease: '157025',
        status: 'reentry',
        
        peakMCFD: 5800,
        peakBOPD: 136,
        cumulativeBCF: 2.3,
        targetMCFD: 10000, // 10 MMCFD
        targetBOPD: 400,
        
        formation: 'Subsalt Wilcox',
        completionDate: null,
        operator: 'Redbird Oilfield Services Corp.',
        field: 'Cross Creek (Wilcox)',
        
        mapPosition: { x: 42, y: 35 },
        
        workProgram: 'SUBSALT RE-ENTRY TARGET. Well was drilled from 12,800 ft to 16,100 ft through a salt overhang of the Humble Salt Dome. The pay sand at 16,350 ft - 16,450 ft was not completed. Proposed: 7" casing to 17,500 ft with four-stage fracturing completion. Bottom hole pressures in excess of 14,000 psi suggest a well rate of 10 MMCFD and 400 BOPD.',
        
        productionDataAvailable: true,
        productionDataRange: { start: '1993-01', end: '2025-09' }
    },
    
    4: {
        name: 'BAHR #4',
        wellNumber: 4,
        api: '42-201-32429',
        lease: '160513',
        status: 'active',
        
        peakMCFD: 1100,
        peakBOPD: 100,
        cumulativeBCF: 0.35,
        targetMCFD: 300,
        targetBOPD: 5,
        
        formation: 'Wilcox A',
        completionDate: null,
        operator: 'Redbird Oilfield Services Corp.',
        field: 'Cross Creek (Wilcox)',
        
        mapPosition: { x: 38, y: 45 },
        
        workProgram: 'Tubing replacement proposed. Well was fractured in the Wilcox A sand and production has declined due to the formation of salt plugs and tubing leaks.',
        
        productionDataAvailable: true,
        productionDataRange: null
    },
    
    6: {
        name: 'BAHR #6',
        wellNumber: 6,
        api: '42-201-32447',
        lease: '161466',
        status: 'active',
        
        peakMCFD: null,
        peakBOPD: null,
        cumulativeBCF: null,
        targetMCFD: null,
        targetBOPD: null,
        
        formation: 'Wilcox',
        completionDate: null,
        operator: 'Redbird Oilfield Services Corp.',
        field: 'Cross Creek (Wilcox)',
        
        mapPosition: { x: 50, y: 42 },
        
        workProgram: 'Evaluation pending. Well data under review for workover potential.',
        
        productionDataAvailable: false,
        productionDataRange: null
    },
    
    7: {
        name: 'BAHR #7',
        wellNumber: 7,
        api: '42-201-32448',
        lease: '161313',
        status: 'priority',
        
        peakMCFD: 6500,
        peakBOPD: 170,
        cumulativeBCF: 3.8,
        targetMCFD: 2400,
        targetBOPD: 20,
        
        formation: 'Wilcox A, C, B',
        completionDate: '1996-07-13',
        operator: 'Redbird Oilfield Services Corp.',
        field: 'Cross Creek (Wilcox)',
        
        mapPosition: { x: 55, y: 50 },
        
        workProgram: 'PRIORITY TARGET — Multistage fracturing in lower Wilcox C and B sands. Well was fractured in the Wilcox A and C sands with multiple lobes unfractured. Proposed multi-stage fracturing can reach production of 2,400 MCFD and 20 BOPD.',
        
        productionDataAvailable: true,
        productionDataRange: { start: '1996-07', end: '2025-09' }
    },
    
    8: {
        name: 'BAHR #8',
        wellNumber: 8,
        api: '42-201-32437',
        lease: '165882',
        status: 'active',
        
        peakMCFD: null,
        peakBOPD: null,
        cumulativeBCF: null,
        targetMCFD: null,
        targetBOPD: null,
        
        formation: 'Wilcox',
        completionDate: '1997-06-16',
        operator: 'Redbird Oilfield Services Corp.',
        field: 'Cross Creek (Wilcox)',
        
        mapPosition: { x: 48, y: 55 },
        
        workProgram: 'Evaluation pending. Well data under review for workover potential.',
        
        productionDataAvailable: false,
        productionDataRange: null
    },
    
    9: {
        name: 'BAHR #9',
        wellNumber: 9,
        api: '42-201-32475',
        lease: '165671',
        status: 'priority',
        
        peakMCFD: 500,
        peakBOPD: 10,
        cumulativeBCF: 0.5,
        targetMCFD: 2400,
        targetBOPD: 20,
        
        formation: 'Wilcox A & B',
        completionDate: null,
        operator: 'Redbird Oilfield Services Corp.',
        field: 'Cross Creek (Wilcox)',
        
        mapPosition: { x: 58, y: 60 },
        
        workProgram: 'PRIORITY TARGET — Multi-stage fracturing of unfractured zones. Well was fractured in the Wilcox A and B sands with a number of perforated but not fractured sands. Proposed multi-stage fracturing can reach production of 2,400 MCFD and 20 BOPD.',
        
        productionDataAvailable: true,
        productionDataRange: { start: '1993-01', end: '2025-09' }
    }
};

// ============================================
// FIELD DATA
// ============================================

const fieldData = {
    name: 'Humble Dome',
    field: 'Cross Creek (Wilcox)',
    county: 'Harris',
    state: 'Texas',
    acreage: 1500,
    
    coordinates: {
        lat: 30.0342,
        lng: -95.2842
    },
    
    totalWells: 8,
    priorityTargets: 2,
    reentryTargets: 1,
    
    totalCumulativeBCF: 14.05, // Sum of known wells
    
    offtake: {
        gas: 'Kinder Morgan (Gulf Coast Gathering)',
        oil: 'Firebird/CDL Crude (trucking)'
    },
    
    servicePartners: [
        'Schlumberger',
        'REDBIRD Energy Services',
        'Newmarc Petroleum'
    ],
    
    history: 'Historic Humble Salt Dome — birthplace of Humble Oil, later renamed Exxon. Proven Wilcox formation reserves with decades of production history.'
};

// ============================================
// INVESTMENT TERMS
// ============================================

const investmentTerms = {
    fullField: {
        name: 'Full Field Program',
        targetRaise: { min: 8500000, max: 9000000 },
        wells: 'All 8 Bahr wells',
        preferredReturn: 0.12, // 12% annually
        preferredPayment: 'quarterly',
        equityBeforePayout: 0.80, // 80% to investors
        equityAfterPayout: 0.75, // 75% to investors, 25% to operator
        structure: 'Reg D Rule 506(c) private placement',
        accreditedOnly: true
    },
    
    quickFlip: {
        name: 'Two-Well Quick Flip',
        targetRaise: 783000,
        wells: 'Bahr #7 and Bahr #9',
        payoutMonths: 9,
        roiProjected: 9.9, // 9.9x over 5 years
        reservesGasBCF: 10.1,
        reservesOilBbl: 114000,
        workingInterest: 0.75, // 75% WI
        netRevenueInterest: 0.745 // 74.5% NRI
    }
};

// ============================================
// HENRY HUB PRICES (Monthly Averages)
// ============================================
// Source: EIA Natural Gas Spot Prices
// Format: { 'YYYY-MM': price_per_MMBtu }

const henryHubPrices = {
    // 1993
    '1993-01': 1.94, '1993-02': 1.77, '1993-03': 1.96, '1993-04': 2.07,
    '1993-05': 2.14, '1993-06': 1.97, '1993-07': 1.95, '1993-08': 1.98,
    '1993-09': 1.99, '1993-10': 1.85, '1993-11': 2.00, '1993-12': 2.15,
    
    // 1994
    '1994-01': 2.10, '1994-02': 1.96, '1994-03': 1.85, '1994-04': 1.82,
    '1994-05': 1.88, '1994-06': 1.83, '1994-07': 1.83, '1994-08': 1.84,
    '1994-09': 1.65, '1994-10': 1.62, '1994-11': 1.69, '1994-12': 1.59,
    
    // 1995
    '1995-01': 1.54, '1995-02': 1.42, '1995-03': 1.45, '1995-04': 1.53,
    '1995-05': 1.61, '1995-06': 1.55, '1995-07': 1.45, '1995-08': 1.46,
    '1995-09': 1.52, '1995-10': 1.56, '1995-11': 1.81, '1995-12': 2.47,
    
    // 1996
    '1996-01': 2.62, '1996-02': 2.46, '1996-03': 2.16, '1996-04': 2.21,
    '1996-05': 2.21, '1996-06': 2.07, '1996-07': 2.21, '1996-08': 2.21,
    '1996-09': 1.87, '1996-10': 2.18, '1996-11': 2.84, '1996-12': 3.49,
    
    // 1997
    '1997-01': 3.45, '1997-02': 2.33, '1997-03': 1.89, '1997-04': 1.88,
    '1997-05': 2.09, '1997-06': 2.14, '1997-07': 2.10, '1997-08': 2.25,
    '1997-09': 2.47, '1997-10': 2.85, '1997-11': 3.07, '1997-12': 2.38,
    
    // 1998
    '1998-01': 2.26, '1998-02': 2.16, '1998-03': 2.14, '1998-04': 2.28,
    '1998-05': 2.12, '1998-06': 2.10, '1998-07': 2.17, '1998-08': 2.17,
    '1998-09': 1.93, '1998-10': 2.03, '1998-11': 2.14, '1998-12': 1.94,
    
    // 1999
    '1999-01': 1.81, '1999-02': 1.74, '1999-03': 1.73, '1999-04': 1.91,
    '1999-05': 2.19, '1999-06': 2.19, '1999-07': 2.23, '1999-08': 2.55,
    '1999-09': 2.68, '1999-10': 2.52, '1999-11': 2.78, '1999-12': 2.28,
    
    // 2000
    '2000-01': 2.39, '2000-02': 2.68, '2000-03': 2.70, '2000-04': 2.93,
    '2000-05': 3.57, '2000-06': 4.29, '2000-07': 4.15, '2000-08': 3.97,
    '2000-09': 4.68, '2000-10': 5.04, '2000-11': 5.09, '2000-12': 7.82,
    
    // 2001
    '2001-01': 9.04, '2001-02': 5.72, '2001-03': 5.05, '2001-04': 4.94,
    '2001-05': 4.32, '2001-06': 3.59, '2001-07': 3.09, '2001-08': 3.18,
    '2001-09': 2.44, '2001-10': 2.06, '2001-11': 2.58, '2001-12': 2.36,
    
    // 2002
    '2002-01': 2.14, '2002-02': 2.15, '2002-03': 2.83, '2002-04': 3.24,
    '2002-05': 3.37, '2002-06': 3.19, '2002-07': 3.07, '2002-08': 2.98,
    '2002-09': 3.33, '2002-10': 3.62, '2002-11': 3.94, '2002-12': 4.37,
    
    // 2003
    '2003-01': 5.23, '2003-02': 6.07, '2003-03': 5.91, '2003-04': 4.89,
    '2003-05': 5.34, '2003-06': 5.63, '2003-07': 5.00, '2003-08': 4.84,
    '2003-09': 4.54, '2003-10': 4.46, '2003-11': 4.42, '2003-12': 5.72,
    
    // 2004
    '2004-01': 5.94, '2004-02': 5.35, '2004-03': 5.29, '2004-04': 5.49,
    '2004-05': 5.99, '2004-06': 6.09, '2004-07': 5.80, '2004-08': 5.30,
    '2004-09': 5.08, '2004-10': 5.95, '2004-11': 6.70, '2004-12': 6.70,
    
    // 2005
    '2005-01': 6.09, '2005-02': 6.06, '2005-03': 6.51, '2005-04': 6.97,
    '2005-05': 6.38, '2005-06': 6.77, '2005-07': 7.54, '2005-08': 8.93,
    '2005-09': 11.59, '2005-10': 13.42, '2005-11': 11.04, '2005-12': 12.41,
    
    // 2006
    '2006-01': 8.99, '2006-02': 7.46, '2006-03': 6.69, '2006-04': 6.84,
    '2006-05': 6.21, '2006-06': 6.00, '2006-07': 6.10, '2006-08': 7.06,
    '2006-09': 5.18, '2006-10': 5.04, '2006-11': 6.92, '2006-12': 6.65,
    
    // 2007
    '2007-01': 6.20, '2007-02': 7.51, '2007-03': 6.94, '2007-04': 7.30,
    '2007-05': 7.55, '2007-06': 7.24, '2007-07': 6.13, '2007-08': 5.95,
    '2007-09': 5.62, '2007-10': 6.35, '2007-11': 7.00, '2007-12': 7.17,
    
    // 2008
    '2008-01': 7.99, '2008-02': 8.55, '2008-03': 9.38, '2008-04': 9.92,
    '2008-05': 11.23, '2008-06': 12.69, '2008-07': 11.09, '2008-08': 8.26,
    '2008-09': 7.53, '2008-10': 6.72, '2008-11': 6.60, '2008-12': 5.62,
    
    // 2009
    '2009-01': 5.24, '2009-02': 4.52, '2009-03': 3.96, '2009-04': 3.50,
    '2009-05': 3.70, '2009-06': 3.65, '2009-07': 3.44, '2009-08': 3.18,
    '2009-09': 2.98, '2009-10': 3.80, '2009-11': 4.08, '2009-12': 5.40,
    
    // 2010
    '2010-01': 5.83, '2010-02': 5.30, '2010-03': 4.30, '2010-04': 4.05,
    '2010-05': 4.18, '2010-06': 4.68, '2010-07': 4.63, '2010-08': 4.28,
    '2010-09': 3.89, '2010-10': 3.43, '2010-11': 3.65, '2010-12': 4.25,
    
    // 2011
    '2011-01': 4.49, '2011-02': 4.08, '2011-03': 3.95, '2011-04': 4.24,
    '2011-05': 4.25, '2011-06': 4.46, '2011-07': 4.40, '2011-08': 4.04,
    '2011-09': 3.89, '2011-10': 3.55, '2011-11': 3.23, '2011-12': 3.17,
    
    // 2012
    '2012-01': 2.67, '2012-02': 2.51, '2012-03': 2.17, '2012-04': 1.95,
    '2012-05': 2.43, '2012-06': 2.40, '2012-07': 2.95, '2012-08': 2.77,
    '2012-09': 2.85, '2012-10': 3.32, '2012-11': 3.54, '2012-12': 3.34,
    
    // 2013
    '2013-01': 3.33, '2013-02': 3.33, '2013-03': 3.81, '2013-04': 4.17,
    '2013-05': 4.04, '2013-06': 3.83, '2013-07': 3.59, '2013-08': 3.43,
    '2013-09': 3.59, '2013-10': 3.68, '2013-11': 3.62, '2013-12': 4.24,
    
    // 2014
    '2014-01': 4.71, '2014-02': 5.93, '2014-03': 4.90, '2014-04': 4.66,
    '2014-05': 4.59, '2014-06': 4.59, '2014-07': 4.01, '2014-08': 3.89,
    '2014-09': 3.93, '2014-10': 3.78, '2014-11': 4.12, '2014-12': 3.46,
    
    // 2015
    '2015-01': 2.99, '2015-02': 2.84, '2015-03': 2.82, '2015-04': 2.56,
    '2015-05': 2.85, '2015-06': 2.78, '2015-07': 2.83, '2015-08': 2.77,
    '2015-09': 2.66, '2015-10': 2.32, '2015-11': 2.09, '2015-12': 1.93,
    
    // 2016
    '2016-01': 2.28, '2016-02': 1.99, '2016-03': 1.73, '2016-04': 1.92,
    '2016-05': 1.92, '2016-06': 2.59, '2016-07': 2.82, '2016-08': 2.82,
    '2016-09': 2.99, '2016-10': 2.98, '2016-11': 2.75, '2016-12': 3.59,
    
    // 2017
    '2017-01': 3.30, '2017-02': 2.85, '2017-03': 2.88, '2017-04': 3.10,
    '2017-05': 3.15, '2017-06': 2.97, '2017-07': 2.98, '2017-08': 2.90,
    '2017-09': 2.98, '2017-10': 2.88, '2017-11': 2.97, '2017-12': 2.81,
    
    // 2018
    '2018-01': 3.87, '2018-02': 2.67, '2018-03': 2.69, '2018-04': 2.80,
    '2018-05': 2.80, '2018-06': 2.97, '2018-07': 2.83, '2018-08': 2.96,
    '2018-09': 2.92, '2018-10': 3.28, '2018-11': 4.09, '2018-12': 4.04,
    
    // 2019
    '2019-01': 3.11, '2019-02': 2.69, '2019-03': 2.95, '2019-04': 2.65,
    '2019-05': 2.64, '2019-06': 2.40, '2019-07': 2.37, '2019-08': 2.22,
    '2019-09': 2.56, '2019-10': 2.33, '2019-11': 2.65, '2019-12': 2.22,
    
    // 2020
    '2020-01': 1.92, '2020-02': 1.91, '2020-03': 1.79, '2020-04': 1.74,
    '2020-05': 1.75, '2020-06': 1.63, '2020-07': 1.77, '2020-08': 2.30,
    '2020-09': 1.92, '2020-10': 2.39, '2020-11': 2.61, '2020-12': 2.59,
    
    // 2021
    '2021-01': 2.71, '2021-02': 5.35, '2021-03': 2.62, '2021-04': 2.66,
    '2021-05': 2.91, '2021-06': 3.26, '2021-07': 3.84, '2021-08': 4.07,
    '2021-09': 5.16, '2021-10': 5.51, '2021-11': 5.05, '2021-12': 3.76,
    
    // 2022
    '2022-01': 4.38, '2022-02': 4.69, '2022-03': 4.90, '2022-04': 6.59,
    '2022-05': 8.14, '2022-06': 7.70, '2022-07': 7.28, '2022-08': 8.81,
    '2022-09': 7.88, '2022-10': 5.66, '2022-11': 5.71, '2022-12': 5.53,
    
    // 2023
    '2023-01': 3.27, '2023-02': 2.39, '2023-03': 2.44, '2023-04': 2.16,
    '2023-05': 2.16, '2023-06': 2.18, '2023-07': 2.60, '2023-08': 2.62,
    '2023-09': 2.66, '2023-10': 3.00, '2023-11': 2.85, '2023-12': 2.51,
    
    // 2024
    '2024-01': 2.74, '2024-02': 1.75, '2024-03': 1.72, '2024-04': 1.61,
    '2024-05': 2.07, '2024-06': 2.53, '2024-07': 2.23, '2024-08': 2.08,
    '2024-09': 2.16, '2024-10': 2.29, '2024-11': 2.59, '2024-12': 3.15,
    
    // 2025 (partial)
    '2025-01': 3.45, '2025-02': 3.20, '2025-03': 3.10, '2025-04': 2.95,
    '2025-05': 2.85
};

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Calculate revenue for a given production and price
 * @param {number} mcf - Production in MCF
 * @param {number} pricePerMMBtu - Price per MMBtu
 * @returns {number} Revenue in dollars
 */
function calculateRevenue(mcf, pricePerMMBtu) {
    // MCF ≈ MMBtu for natural gas (slight difference but close enough)
    return mcf * pricePerMMBtu;
}

/**
 * Calculate monthly revenue for a well at a given rate
 * @param {number} mcfd - Production rate in MCFD
 * @param {number} pricePerMMBtu - Price per MMBtu
 * @param {number} daysInMonth - Days in the month (default 30)
 * @returns {number} Monthly revenue in dollars
 */
function calculateMonthlyRevenue(mcfd, pricePerMMBtu, daysInMonth = 30) {
    const monthlyMCF = mcfd * daysInMonth;
    return calculateRevenue(monthlyMCF, pricePerMMBtu);
}

/**
 * Get price for a specific month
 * @param {string} yearMonth - Format 'YYYY-MM'
 * @returns {number|null} Price per MMBtu or null if not found
 */
function getPrice(yearMonth) {
    return henryHubPrices[yearMonth] || null;
}

/**
 * Get annual average price
 * @param {number} year - Year (e.g., 2024)
 * @returns {number|null} Average price for the year
 */
function getAnnualAveragePrice(year) {
    const yearStr = year.toString();
    const monthlyPrices = Object.entries(henryHubPrices)
        .filter(([key]) => key.startsWith(yearStr))
        .map(([, value]) => value);
    
    if (monthlyPrices.length === 0) return null;
    return monthlyPrices.reduce((a, b) => a + b, 0) / monthlyPrices.length;
}

/**
 * Format currency
 * @param {number} amount
 * @returns {string}
 */
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount);
}

/**
 * Format number with commas
 * @param {number} num
 * @returns {string}
 */
function formatNumber(num) {
    return new Intl.NumberFormat('en-US').format(num);
}

// ============================================
// PRODUCTION DATA TEMPLATE
// ============================================
// This is where RRC PDQ data will go once pulled
// Format: { wellNumber: { 'YYYY-MM': { gas: mcf, oil: bbl } } }

const productionData = {
    // Example structure - to be filled with actual RRC data
    /*
    1: {
        '1997-06': { gas: 216000, oil: 3240 }, // 7200 MCFD * 30 days
        '1997-07': { gas: 198000, oil: 2800 },
        // ... more months
    }
    */
};

// ============================================
// EXPORTS (for ES modules)
// ============================================

// If using as ES module:
// export { wellData, fieldData, investmentTerms, henryHubPrices, productionData };
// export { calculateRevenue, calculateMonthlyRevenue, getPrice, getAnnualAveragePrice };
// export { formatCurrency, formatNumber };

// For browser global:
if (typeof window !== 'undefined') {
    window.HumbleDome = {
        wellData,
        fieldData,
        investmentTerms,
        henryHubPrices,
        productionData,
        calculateRevenue,
        calculateMonthlyRevenue,
        getPrice,
        getAnnualAveragePrice,
        formatCurrency,
        formatNumber
    };
}

console.log('Humble Dome Data loaded. Access via window.HumbleDome');
