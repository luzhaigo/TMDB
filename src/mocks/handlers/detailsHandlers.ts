import { http, HttpResponse, HttpResponseResolver } from 'msw';

const movieResolver: HttpResponseResolver = () => {
  return HttpResponse.json({
    adult: false,
    backdrop_path: '/mSDsSDwaP3E7dEfUPWy4J0djt4O.jpg',
    belongs_to_collection: null,
    budget: 19000000,
    genres: [
      {
        id: 16,
        name: 'Animation',
      },
      {
        id: 10751,
        name: 'Family',
      },
      {
        id: 14,
        name: 'Fantasy',
      },
    ],
    homepage: 'http://movies.disney.com/spirited-away',
    id: 129,
    imdb_id: 'tt0245429',
    original_language: 'ja',
    original_title: '千と千尋の神隠し',
    overview:
      'A young girl, Chihiro, becomes trapped in a strange new world of spirits. When her parents undergo a mysterious transformation, she must call upon the courage she never knew she had to free her family.',
    popularity: 214.154,
    poster_path: '/39wmItIWsg5sZMyRUHLkWBcuVCM.jpg',
    production_companies: [
      {
        id: 10342,
        logo_path: '/eS79pslnoKbWg7t3PMA9ayl0bGs.png',
        name: 'Studio Ghibli',
        origin_country: 'JP',
      },
    ],
    production_countries: [
      {
        iso_3166_1: 'JP',
        name: 'Japan',
      },
    ],
    release_date: '2001-07-20',
    revenue: 274925095,
    runtime: 125,
    spoken_languages: [
      {
        english_name: 'Japanese',
        iso_639_1: 'ja',
        name: '日本語',
      },
    ],
    status: 'Released',
    tagline: '',
    title: 'Spirited Away',
    video: false,
    vote_average: 8.541,
    vote_count: 15669,
    credits: {
      cast: [
        {
          adult: false,
          gender: 1,
          id: 19587,
          known_for_department: 'Acting',
          name: 'Rumi Hiiragi',
          original_name: 'Rumi Hiiragi',
          popularity: 11.005,
          profile_path: '/zITaVtFyc4xSM3mxSoPRWHbqgJI.jpg',
          cast_id: 3,
          character: 'Chihiro Ogino / Sen (voice)',
          credit_id: '52fe421bc3a36847f8004a97',
          order: 0,
        },
        {
          adult: false,
          gender: 2,
          id: 19588,
          known_for_department: 'Acting',
          name: 'Miyu Irino',
          original_name: 'Miyu Irino',
          popularity: 18.094,
          profile_path: '/dcZ4IJX8CBcJzxy8hhKFXv59LDE.jpg',
          cast_id: 4,
          character: 'Haku (voice)',
          credit_id: '52fe421bc3a36847f8004a9b',
          order: 1,
        },
        {
          adult: false,
          gender: 1,
          id: 19589,
          known_for_department: 'Acting',
          name: 'Mari Natsuki',
          original_name: 'Mari Natsuki',
          popularity: 25.399,
          profile_path: '/aRs3dGqA2bCuGSZ7lJGhQKe8rhp.jpg',
          cast_id: 5,
          character: 'Yubaba / Zeniba (voice)',
          credit_id: '52fe421bc3a36847f8004a9f',
          order: 2,
        },
      ],
      crew: [
        {
          adult: false,
          gender: 2,
          id: 608,
          known_for_department: 'Directing',
          name: 'Hayao Miyazaki',
          original_name: 'Hayao Miyazaki',
          popularity: 83.384,
          profile_path: '/mG3cfxtA5jqDc7fpKgyzZMKoXDh.jpg',
          credit_id: '52fe421bc3a36847f8004a8d',
          department: 'Directing',
          job: 'Director',
        },
      ],
    },
  });
};

const tvResolver: HttpResponseResolver = () => {
  return HttpResponse.json({
    adult: false,
    backdrop_path: '/6snBXmgkscLEJQmxx46qEIlqYlB.jpg',
    created_by: [
      {
        id: 20457,
        credit_id: '65b38e665e14e501620c344f',
        name: 'John Orloff',
        gender: 2,
        profile_path: null,
      },
    ],
    episode_run_time: [],
    first_air_date: '2024-01-25',
    genres: [
      {
        id: 10768,
        name: 'War & Politics',
      },
      {
        id: 18,
        name: 'Drama',
      },
    ],
    homepage: 'https://tv.apple.com/show/umc.cmc.7bxcni0vwgll9kmicq738k5q2',
    id: 46518,
    in_production: false,
    languages: ['en'],
    last_air_date: '2024-03-14',
    last_episode_to_air: {
      id: 4745573,
      name: 'Part Nine',
      overview:
        'The POWs are marched across Germany—and Rosie makes a gruesome discovery—as the war comes to its conclusion.',
      vote_average: 6.5,
      vote_count: 2,
      air_date: '2024-03-14',
      episode_number: 9,
      episode_type: 'finale',
      production_code: '',
      runtime: 78,
      season_number: 1,
      show_id: 46518,
      still_path: '/4kgS4MSLXtIIcC3vijBAd15zPj2.jpg',
    },
    name: 'Masters of the Air',
    next_episode_to_air: null,
    networks: [
      {
        id: 2552,
        logo_path: '/4KAy34EHvRM25Ih8wb82AuGU7zJ.png',
        name: 'Apple TV+',
        origin_country: '',
      },
    ],
    number_of_episodes: 9,
    number_of_seasons: 1,
    origin_country: ['US'],
    original_language: 'en',
    original_name: 'Masters of the Air',
    overview:
      'During World War II, airmen risk their lives with the 100th Bomb Group, a brotherhood forged by courage, loss, and triumph.',
    popularity: 575.967,
    poster_path: '/rSAmgcoA74371rplbqM27yVsd3y.jpg',
    production_companies: [
      {
        id: 7671,
        logo_path: '/r7KeUsNVv0iggZRh6XmNNq2OEw1.png',
        name: 'Amblin Television',
        origin_country: 'US',
      },
      {
        id: 4171,
        logo_path: '/ip8rzankhLLhJGGkvfCirfUM26d.png',
        name: 'Playtone',
        origin_country: 'US',
      },
      {
        id: 194232,
        logo_path: '/oE7H93u8sy5vvW5EH3fpCp68vvB.png',
        name: 'Apple Studios',
        origin_country: 'US',
      },
    ],
    production_countries: [
      {
        iso_3166_1: 'US',
        name: 'United States of America',
      },
    ],
    seasons: [
      {
        air_date: '2024-01-25',
        episode_count: 9,
        id: 127255,
        name: 'Miniseries',
        overview: '',
        poster_path: '/rSAmgcoA74371rplbqM27yVsd3y.jpg',
        season_number: 1,
        vote_average: 6.2,
      },
    ],
    spoken_languages: [
      {
        english_name: 'English',
        iso_639_1: 'en',
        name: 'English',
      },
    ],
    status: 'Ended',
    tagline: '',
    type: 'Miniseries',
    vote_average: 7.911,
    vote_count: 157,
    aggregate_credits: {
      cast: [
        {
          adult: false,
          gender: 2,
          id: 86654,
          known_for_department: 'Acting',
          name: 'Austin Butler',
          original_name: 'Austin Butler',
          popularity: 108.722,
          profile_path: '/jn63A9goIetyvJt5DTHypjk33ip.jpg',
          roles: [
            {
              credit_id: '60393816b6cff100650c1e9e',
              character: "Maj. Gale 'Buck' Cleven",
              episode_count: 9,
            },
          ],
          total_episode_count: 9,
          order: 0,
        },
        {
          adult: false,
          gender: 2,
          id: 1371041,
          known_for_department: 'Acting',
          name: 'Callum Turner',
          original_name: 'Callum Turner',
          popularity: 56.055,
          profile_path: '/vkZ35K9ge6rWNrGyRdRtS4ONITv.jpg',
          roles: [
            {
              credit_id: '60393823cee481005ae9bff4',
              character: "Maj. John 'Bucky' Egan",
              episode_count: 9,
            },
          ],
          total_episode_count: 9,
          order: 1,
        },
        {
          adult: false,
          gender: 2,
          id: 1727213,
          known_for_department: 'Acting',
          name: 'Anthony Boyle',
          original_name: 'Anthony Boyle',
          popularity: 14.881,
          profile_path: '/Nw0X9BFGO65eDo62jL8mWcofm7.jpg',
          roles: [
            {
              credit_id: '6050fbb2594c94003d29fa02',
              character: 'Lt./Cpt./Maj. Harry Crosby',
              episode_count: 9,
            },
          ],
          total_episode_count: 9,
          order: 2,
        },
      ],
      crew: [
        {
          adult: false,
          gender: 0,
          id: 957666,
          known_for_department: 'Art',
          name: 'Celia Bobak',
          original_name: 'Celia Bobak',
          popularity: 6.504,
          profile_path: null,
          jobs: [
            {
              credit_id: '65dfd026daf57c01859ab453',
              job: 'Set Decoration',
              episode_count: 9,
            },
          ],
          department: 'Art',
          total_episode_count: 9,
        },
      ],
    },
  });
};

export default [
  http.get('*/movie/:id', movieResolver),
  http.options('*/movie/:id', movieResolver),
  http.get('*/tv/:id', tvResolver),
  http.options('*/tv/:id', tvResolver),
];
