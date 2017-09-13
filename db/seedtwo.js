// create db connection
const db = require('./index');

// require User schema
const User = require('./models/User');

// clear database
User.collection.drop();

// seed data
const seedUser = User({
  fbID: '0100205207988687',
  user: 'John Smith',
  token: 'EAAMZAxlKQaYsBAJa1R7zvOoHZCf2mpz3qTWNhN1owMxhM1ViCEkcLJLKCHiB4eD0dJobOV3lrjqEzld1dVdAwfJHdZCizr1ELTCaTDfJZBYRhmzfIWF1cZBgZAKTIOXj7UtAEm41jjAgwD1AYPvnYFuqBi57MtN6EZD',
  photo: 'https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/16387256_10100135191637018_347784059648177463_n.jpg?oh=5e4947aa036e8676fed751f0e07cc83a&oe=5A5C5D21',
  interestsByCity: [
    {
      city: 'Los Angeles, CA',
      "interests": [
        {
            "id": "molinari-delicatessen-san-francisco",
            "name": "Molinari Delicatessen",
            "image_url": "https://s3-media1.fl.yelpcdn.com/bphoto/H_vQ3ElMoQ8j1bKidrv_1w/o.jpg",
            "is_closed": false,
            "url": "https://www.yelp.com/biz/molinari-delicatessen-san-francisco?adjust_creative=TJCJBQCAAm_aB5D00Y6-UQ&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=TJCJBQCAAm_aB5D00Y6-UQ",
            "review_count": 942,
            "categories": [
                {
                    "alias": "delis",
                    "title": "Delis"
                }
            ],
            "rating": 4.5,
            "coordinates": {
                "latitude": 37.79838,
                "longitude": -122.40782
            },
            "transactions": [
                "pickup"
            ],
            "price": "$$",
            "location": {
                "address1": "373 Columbus Ave",
                "address2": "",
                "address3": "",
                "city": "San Francisco",
                "zip_code": "94133",
                "country": "US",
                "state": "CA",
                "display_address": [
                    "373 Columbus Ave",
                    "San Francisco, CA 94133"
                ]
            },
            "phone": "+14154212337",
            "display_phone": "(415) 421-2337",
            "distance": 1457.3691859340609
        },
        {
            "id": "deli-board-san-francisco",
            "name": "Deli Board",
            "image_url": "https://s3-media4.fl.yelpcdn.com/bphoto/wA6jJVj5-by8NzVCCuBlmQ/o.jpg",
            "is_closed": false,
            "url": "https://www.yelp.com/biz/deli-board-san-francisco?adjust_creative=TJCJBQCAAm_aB5D00Y6-UQ&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=TJCJBQCAAm_aB5D00Y6-UQ",
            "review_count": 1054,
            "categories": [
                {
                    "alias": "delis",
                    "title": "Delis"
                },
                {
                    "alias": "sandwiches",
                    "title": "Sandwiches"
                }
            ],
            "rating": 4.5,
            "coordinates": {
                "latitude": 37.7776247966103,
                "longitude": -122.407012712007
            },
            "transactions": [],
            "price": "$$",
            "location": {
                "address1": "1058 Folsom St",
                "address2": "",
                "address3": "",
                "city": "San Francisco",
                "zip_code": "94103",
                "country": "US",
                "state": "CA",
                "display_address": [
                    "1058 Folsom St",
                    "San Francisco, CA 94103"
                ]
            },
            "phone": "+14155527687",
            "display_phone": "(415) 552-7687",
            "distance": 1201.0404777049664
        },
        {
            "id": "the-boys-deli-san-francisco",
            "name": "The Boy's Deli",
            "image_url": "https://s3-media1.fl.yelpcdn.com/bphoto/8Jm9Hm4qTfXEYwGLttjh3w/o.jpg",
            "is_closed": false,
            "url": "https://www.yelp.com/biz/the-boys-deli-san-francisco?adjust_creative=TJCJBQCAAm_aB5D00Y6-UQ&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=TJCJBQCAAm_aB5D00Y6-UQ",
            "review_count": 233,
            "categories": [
                {
                    "alias": "delis",
                    "title": "Delis"
                },
                {
                    "alias": "meats",
                    "title": "Meat Shops"
                },
                {
                    "alias": "sandwiches",
                    "title": "Sandwiches"
                }
            ],
            "rating": 4.5,
            "coordinates": {
                "latitude": 37.7971806,
                "longitude": -122.421842
            },
            "transactions": [
                "pickup"
            ],
            "price": "$",
            "location": {
                "address1": "2222 Polk St",
                "address2": "",
                "address3": "Polk & Green Produce Market",
                "city": "San Francisco",
                "zip_code": "94109",
                "country": "US",
                "state": "CA",
                "display_address": [
                    "2222 Polk St",
                    "Polk & Green Produce Market",
                    "San Francisco, CA 94109"
                ]
            },
            "phone": "+14157763099",
            "display_phone": "(415) 776-3099",
            "distance": 2239.5474905896026
        },
        {
            "id": "alimento-san-francisco-2",
            "name": "Alimento",
            "image_url": "https://s3-media3.fl.yelpcdn.com/bphoto/WDRbAihCW-9mOOjO42ABXQ/o.jpg",
            "is_closed": false,
            "url": "https://www.yelp.com/biz/alimento-san-francisco-2?adjust_creative=TJCJBQCAAm_aB5D00Y6-UQ&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=TJCJBQCAAm_aB5D00Y6-UQ",
            "review_count": 521,
            "categories": [
                {
                    "alias": "delis",
                    "title": "Delis"
                },
                {
                    "alias": "gelato",
                    "title": "Gelato"
                },
                {
                    "alias": "sandwiches",
                    "title": "Sandwiches"
                }
            ],
            "rating": 4.5,
            "coordinates": {
                "latitude": 37.799561,
                "longitude": -122.409221
            },
            "transactions": [
                "pickup"
            ],
            "price": "$",
            "location": {
                "address1": "507 Columbus Ave",
                "address2": null,
                "address3": "",
                "city": "San Francisco",
                "zip_code": "94133",
                "country": "US",
                "state": "CA",
                "display_address": [
                    "507 Columbus Ave",
                    "San Francisco, CA 94133"
                ]
            },
            "phone": "+14152969463",
            "display_phone": "(415) 296-9463",
            "distance": 1627.3500184592835
        },
        {
            "id": "bite-san-francisco",
            "name": "Bite",
            "image_url": "https://s3-media1.fl.yelpcdn.com/bphoto/7uYT0GGhsNmNQZ0zfv_s6w/o.jpg",
            "is_closed": false,
            "url": "https://www.yelp.com/biz/bite-san-francisco?adjust_creative=TJCJBQCAAm_aB5D00Y6-UQ&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=TJCJBQCAAm_aB5D00Y6-UQ",
            "review_count": 564,
            "categories": [
                {
                    "alias": "delis",
                    "title": "Delis"
                },
                {
                    "alias": "sandwiches",
                    "title": "Sandwiches"
                },
                {
                    "alias": "salad",
                    "title": "Salad"
                }
            ],
            "rating": 4.5,
            "coordinates": {
                "latitude": 37.7884239641,
                "longitude": -122.415666133
            },
            "transactions": [
                "delivery",
                "pickup"
            ],
            "price": "$",
            "location": {
                "address1": "912 Sutter St",
                "address2": "",
                "address3": "",
                "city": "San Francisco",
                "zip_code": "94104",
                "country": "US",
                "state": "CA",
                "display_address": [
                    "912 Sutter St",
                    "San Francisco, CA 94104"
                ]
            },
            "phone": "+14155632483",
            "display_phone": "(415) 563-2483",
            "distance": 1389.7880778415222
        },
        {
            "id": "central-station-deli-san-francisco",
            "name": "Central Station Deli",
            "image_url": "https://s3-media2.fl.yelpcdn.com/bphoto/cai2f-WYClhVF88G92YhXA/o.jpg",
            "is_closed": false,
            "url": "https://www.yelp.com/biz/central-station-deli-san-francisco?adjust_creative=TJCJBQCAAm_aB5D00Y6-UQ&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=TJCJBQCAAm_aB5D00Y6-UQ",
            "review_count": 43,
            "categories": [
                {
                    "alias": "salad",
                    "title": "Salad"
                },
                {
                    "alias": "sandwiches",
                    "title": "Sandwiches"
                },
                {
                    "alias": "delis",
                    "title": "Delis"
                }
            ],
            "rating": 4.5,
            "coordinates": {
                "latitude": 37.7986219143896,
                "longitude": -122.409397736192
            },
            "transactions": [],
            "price": "$$",
            "location": {
                "address1": "728 Vallejo St",
                "address2": "",
                "address3": "",
                "city": "San Francisco",
                "zip_code": "94133",
                "country": "US",
                "state": "CA",
                "display_address": [
                    "728 Vallejo St",
                    "San Francisco, CA 94133"
                ]
            },
            "phone": "+14156587310",
            "display_phone": "(415) 658-7310",
            "distance": 1546.0322052415072
        }
      ],
      "dislikedInterests": [
        {
            "id": "good-luck-cafe-and-deli-san-francisco",
            "name": "Good Luck Cafe and Deli",
            "image_url": "https://s3-media3.fl.yelpcdn.com/bphoto/7diLgtddAjlrYm_62uLvUQ/o.jpg",
            "is_closed": false,
            "url": "https://www.yelp.com/biz/good-luck-cafe-and-deli-san-francisco?adjust_creative=TJCJBQCAAm_aB5D00Y6-UQ&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=TJCJBQCAAm_aB5D00Y6-UQ",
            "review_count": 358,
            "categories": [
                {
                    "alias": "delis",
                    "title": "Delis"
                },
                {
                    "alias": "cafes",
                    "title": "Cafes"
                },
                {
                    "alias": "sandwiches",
                    "title": "Sandwiches"
                }
            ],
            "rating": 4.5,
            "coordinates": {
                "latitude": 37.793838,
                "longitude": -122.404846
            },
            "transactions": [],
            "price": "$",
            "location": {
                "address1": "621 Kearny St",
                "address2": null,
                "address3": "",
                "city": "San Francisco",
                "zip_code": "94108",
                "country": "US",
                "state": "CA",
                "display_address": [
                    "621 Kearny St",
                    "San Francisco, CA 94108"
                ]
            },
            "phone": "+14157812328",
            "display_phone": "(415) 781-2328",
            "distance": 885.9092620098163
        },
        {
            "id": "teds-market-san-francisco-3",
            "name": "Teds Market",
            "image_url": "https://s3-media1.fl.yelpcdn.com/bphoto/9oLhikqyvN3kAlDoW3iECg/o.jpg",
            "is_closed": false,
            "url": "https://www.yelp.com/biz/teds-market-san-francisco-3?adjust_creative=TJCJBQCAAm_aB5D00Y6-UQ&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=TJCJBQCAAm_aB5D00Y6-UQ",
            "review_count": 415,
            "categories": [
                {
                    "alias": "delis",
                    "title": "Delis"
                },
                {
                    "alias": "sandwiches",
                    "title": "Sandwiches"
                },
                {
                    "alias": "catering",
                    "title": "Caterers"
                }
            ],
            "rating": 4.5,
            "coordinates": {
                "latitude": 37.7728691101074,
                "longitude": -122.416229248047
            },
            "transactions": [
                "pickup"
            ],
            "price": "$",
            "location": {
                "address1": "1530 Howard St",
                "address2": "",
                "address3": "",
                "city": "San Francisco",
                "zip_code": "94103",
                "country": "US",
                "state": "CA",
                "display_address": [
                    "1530 Howard St",
                    "San Francisco, CA 94103"
                ]
            },
            "phone": "+14155520309",
            "display_phone": "(415) 552-0309",
            "distance": 2114.246875915017
        },
        {
            "id": "5th-avenue-deli-and-market-san-francisco",
            "name": "5th Avenue Deli & Market",
            "image_url": "https://s3-media2.fl.yelpcdn.com/bphoto/kCw-46xiRawlFBGyK85OwA/o.jpg",
            "is_closed": false,
            "url": "https://www.yelp.com/biz/5th-avenue-deli-and-market-san-francisco?adjust_creative=TJCJBQCAAm_aB5D00Y6-UQ&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=TJCJBQCAAm_aB5D00Y6-UQ",
            "review_count": 13,
            "categories": [
                {
                    "alias": "delis",
                    "title": "Delis"
                },
                {
                    "alias": "grocery",
                    "title": "Grocery"
                },
                {
                    "alias": "sandwiches",
                    "title": "Sandwiches"
                }
            ],
            "rating": 4.5,
            "coordinates": {
                "latitude": 37.7951292693615,
                "longitude": -122.396138906479
            },
            "transactions": [
                "pickup"
            ],
            "price": "$",
            "location": {
                "address1": "4 Embarcadero Ctr",
                "address2": "",
                "address3": "",
                "city": "San Francisco",
                "zip_code": "94111",
                "country": "US",
                "state": "CA",
                "display_address": [
                    "4 Embarcadero Ctr",
                    "San Francisco, CA 94111"
                ]
            },
            "phone": "+14157570950",
            "display_phone": "(415) 757-0950",
            "distance": 990.6103887827093
        },
        {
            "id": "sutter-st-cafe-san-francisco",
            "name": "Sutter St. Cafe",
            "image_url": "https://s3-media4.fl.yelpcdn.com/bphoto/5KtbEXlCGte1OM1K5eULsw/o.jpg",
            "is_closed": false,
            "url": "https://www.yelp.com/biz/sutter-st-cafe-san-francisco?adjust_creative=TJCJBQCAAm_aB5D00Y6-UQ&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=TJCJBQCAAm_aB5D00Y6-UQ",
            "review_count": 123,
            "categories": [
                {
                    "alias": "cafes",
                    "title": "Cafes"
                },
                {
                    "alias": "delis",
                    "title": "Delis"
                }
            ],
            "rating": 4.5,
            "coordinates": {
                "latitude": 37.7894760577176,
                "longitude": -122.407699611023
            },
            "transactions": [
                "pickup"
            ],
            "price": "$",
            "location": {
                "address1": "450 Sutter St",
                "address2": null,
                "address3": "",
                "city": "San Francisco",
                "zip_code": "94108",
                "country": "US",
                "state": "CA",
                "display_address": [
                    "450 Sutter St",
                    "San Francisco, CA 94108"
                ]
            },
            "phone": "+14153628342",
            "display_phone": "(415) 362-8342",
            "distance": 737.8068007334791
        },
        {
            "id": "petite-deli-and-picnic-san-francisco",
            "name": "Petite Deli & Picnic",
            "image_url": "https://s3-media2.fl.yelpcdn.com/bphoto/t8b4wVLzzuDrtUGKO6U91g/o.jpg",
            "is_closed": false,
            "url": "https://www.yelp.com/biz/petite-deli-and-picnic-san-francisco?adjust_creative=TJCJBQCAAm_aB5D00Y6-UQ&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=TJCJBQCAAm_aB5D00Y6-UQ",
            "review_count": 385,
            "categories": [
                {
                    "alias": "delis",
                    "title": "Delis"
                },
                {
                    "alias": "sandwiches",
                    "title": "Sandwiches"
                },
                {
                    "alias": "salad",
                    "title": "Salad"
                }
            ],
            "rating": 4.5,
            "coordinates": {
                "latitude": 37.80175,
                "longitude": -122.41206
            },
            "transactions": [],
            "price": "$",
            "location": {
                "address1": "752 Columbus Ave",
                "address2": "",
                "address3": "",
                "city": "San Francisco",
                "zip_code": "94133",
                "country": "US",
                "state": "CA",
                "display_address": [
                    "752 Columbus Ave",
                    "San Francisco, CA 94133"
                ]
            },
            "phone": "+14153747351",
            "display_phone": "(415) 374-7351",
            "distance": 1960.352700448039
        },
        {
            "id": "millers-east-coast-deli-san-francisco",
            "name": "Miller's East Coast Deli",
            "image_url": "https://s3-media2.fl.yelpcdn.com/bphoto/IKfWQXlL3vEfcsyPE2GZQA/o.jpg",
            "is_closed": false,
            "url": "https://www.yelp.com/biz/millers-east-coast-deli-san-francisco?adjust_creative=TJCJBQCAAm_aB5D00Y6-UQ&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=TJCJBQCAAm_aB5D00Y6-UQ",
            "review_count": 1340,
            "categories": [
                {
                    "alias": "delis",
                    "title": "Delis"
                },
                {
                    "alias": "sandwiches",
                    "title": "Sandwiches"
                },
                {
                    "alias": "breakfast_brunch",
                    "title": "Breakfast & Brunch"
                }
            ],
            "rating": 3.5,
            "coordinates": {
                "latitude": 37.79273,
                "longitude": -122.42145
            },
            "transactions": [
                "pickup"
            ],
            "price": "$$",
            "location": {
                "address1": "1725 Polk St",
                "address2": "",
                "address3": "",
                "city": "San Francisco",
                "zip_code": "94109",
                "country": "US",
                "state": "CA",
                "display_address": [
                    "1725 Polk St",
                    "San Francisco, CA 94109"
                ]
            },
            "phone": "+14155633542",
            "display_phone": "(415) 563-3542",
            "distance": 1993.499439247627
        }
      ]
    }
  ],
  itineraryByCity: [
    {
      name: 'Labor Day Fiesta',
      itineraryList: [
        {
          "id": "venice-beach-venice",
          "name": "Venice Beach",
          "image_url": "https://s3-media1.fl.yelpcdn.com/bphoto/I16LadYQPot1iuQacfRiNQ/o.jpg",
          "is_closed": false,
          "url": "https://www.yelp.com/biz/venice-beach-venice?adjust_creative=TJCJBQCAAm_aB5D00Y6-UQ&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=TJCJBQCAAm_aB5D00Y6-UQ",
          "review_count": 488,
          "categories": [
            {
              "alias": "beaches",
              "title": "Beaches"
            }
          ],
          "rating": 4,
          "coordinates": {
            "latitude": 33.978504,
            "longitude": -118.467698
          },
          "transactions": [],
          "location": {
            "address1": "1500 Ocean Front Walk",
            "address2": "",
            "address3": "",
            "city": "Venice",
            "zip_code": "90291",
            "country": "US",
            "state": "CA",
            "display_address": ["1500 Ocean Front Walk", "Venice, CA 90291"]
          },
          "phone": "+13106503255",
          "display_phone": "(310) 650-3255",
          "distance": 16346.07603604
        }, {
          "id": "sidecar-doughnuts-and-coffee-santa-monica-3",
          "name": "Sidecar Doughnuts & Coffee",
          "image_url": "https://s3-media3.fl.yelpcdn.com/bphoto/wgqAz3xPWJJdWFZ3ccTGvg/o.jpg",
          "is_closed": false,
          "url": "https://www.yelp.com/biz/sidecar-doughnuts-and-coffee-santa-monica-3?adjust_creative=TJCJBQCAAm_aB5D00Y6-UQ&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=TJCJBQCAAm_aB5D00Y6-UQ",
          "review_count": 818,
          "categories": [
            {
              "alias": "donuts",
              "title": "Donuts"
            }, {
              "alias": "coffee",
              "title": "Coffee & Tea"
            }
          ],
          "rating": 4.5,
          "coordinates": {
            "latitude": 34.021437,
            "longitude": -118.49598
          },
          "transactions": [],
          "price": "$$",
          "location": {
            "address1": "631 Wilshire Blvd",
            "address2": "",
            "address3": "",
            "city": "Santa Monica",
            "zip_code": "90401",
            "country": "US",
            "state": "CA",
            "display_address": ["631 Wilshire Blvd", "Santa Monica, CA 90401"]
          },
          "phone": "+13105870022",
          "display_phone": "(310) 587-0022",
          "distance": 16695.42673522
        }
      ]
    }
  ]
});

//save seed data to db
seedUser.save((err, result) => {
  if (err) { throw err; }
  console.log('Seed data successfully', result);
});

//close db
db.close();
