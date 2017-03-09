'use strict';

module.exports = {
    getMobiles: function getMobiles () {
        return {
            heading: 'Top Deals',
            items: {
                gnusmas: {
                    make: 'Gnusmas',
                    model: 'Universe V8',
                    ram: '2GB',
                    cpu: '2Ghz Quad-core',
                    display: '5" 1920x1080',
                    battery: '2000 mAh'
                },
                egl: {
                    make: 'EGL',
                    model: 'Hatchery Z',
                    ram: '3GB',
                    cpu: '2.4Ghz Quad-core',
                    display: '5.5" 2560x1440',
                    battery: '3500 mAh'
                },
                angularJs: {
                    make: 'ngRepeat',
                    model: 'Limit 8',
                    ram: '4GB',
                    cpu: '3.2Ghz Octa-core',
                    display: '5.2" 1920x1080',
                    battery: '3200 mAh'
                }
            }
        };
    },

    getTablets: function getTablets () {
        return {
            heading: 'Our Tablets',
            items: {
                quantum: {
                    make: 'Gnusmas',
                    model: 'Quantum HD',
                    ram: '2GB',
                    cpu: '2Ghz Quad-core',
                    display: '8" 1920x1080',
                    battery: '3000 mAh'
                },
                xl4: {
                    make: 'Ynos',
                    model: 'XL 4',
                    ram: '3GB',
                    cpu: '2.8Ghz Quad-core',
                    display: '10" 1920x1080',
                    battery: '3400 mAh',
                    bonus: 'Smart watch'
                }
            }
        };
    },

    getWearable: function getWearable () {
        return {
            heading: 'Super gadgets',
            items: {
                googles: {
                    make: 'America',
                    model: 'Googles',
                    ram: '1GB',
                    cpu: '2Ghz Dual-core',
                    display: '2x 2" 640x480',
                    battery: '1200 mAh',
                    description: 'Virtual glasses'
                },
                pen: {
                    make: 'America',
                    model: 'Smart Pen',
                    battery: '800 mAh',
                    description: 'Remote control'
                },
                holo: {
                    make: 'Amanzaman',
                    model: 'Holo 3D',
                    ram: '3GB',
                    cpu: '2Ghz Octa-core',
                    display: 'Holographic 3D Projection',
                    battery: '10000 mAh',
                    description: 'Star Wars'
                }
            }
        };
    }
};