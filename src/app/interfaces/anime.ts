export class anime {
  title: string;
  id: string;
  image: string;
  type: string;
  summary: string;
  released: string;
  genres: string;
  totalepisode: string;
  Othername: string;
  status: string;
  episodenumber: string;
}

export interface Anime_data {
  mal_id: number;
  url: string;
  images: {
    jpg: {
      image_url: string | null;
      small_image_url: string | null;
      large_image_url: string | null;
    };
    webp: {
      image_url: string | null;
      small_image_url: string | null;
      large_image_url: string | null;
    };
  };
  trailer: {
    youtube_id: string | null;
    url: string | null;
    embed_url: string | null;
  };
  approved: boolean;
  titles: [
    {
      type: string;
      title: string;
    }
  ];
  title: string;
  title_english: string | null;
  title_japanese: string | null;
  title_synonyms: [string | null];
  type: string | null;
  source: string | null;
  episodes: number | null;
  status: string | null;
  airing: boolean;
  aired: {
    from: string | null;
    to: string | null;
    prop: {
      from: {
        day: number | null;
        month: number | null;
        year: number | null;
      };
      to: {
        day: number | null;
        month: number | null;
        year: number | null;
      };
      string: string | null;
    };
  };
  duration: string | null;
  rating: string | null;
  score: number | null;
  scored_by: number | null;
  rank: number | null;
  popularity: number | null;
  members: number | null;
  favorites: number | null;
  synopsis: string | null;
  background: string | null;
  season: string | null;
  year: number | null;
  broadcast: {
    day: string | null;
    time: string | null;
    timezone: string | null;
    string: string | null;
  };
  producers: [
    {
      mal_id: 0;
      type: string;
      name: string;
      url: string;
    }
  ];
  licensors: [
    {
      mal_id: number;
      type: string;
      name: string;
      url: string;
    }
  ];
  studios: [
    {
      mal_id: number;
      type: string;
      name: string;
      url: string;
    }
  ];
  genres: [
    {
      mal_id: number;
      type: string;
      name: string;
      url: string;
    }
  ];
  explicit_genres: [
    {
      mal_id: number;
      type: string;
      name: string;
      url: string;
    }
  ];
  themes: [
    {
      mal_id: number;
      type: string;
      name: string;
      url: string;
    }
  ];
  demographics: [
    {
      mal_id: number;
      type: string;
      name: string;
      url: string;
    }
  ];
}

export interface Data_pack {
  data: Anime_data[];
  pagination: {
    last_visible_page: number;
    has_next_page: boolean;
    current_page: number;
    items: {
      count: number;
      total: number;
      per_page: number;
    };
  };
}

export interface Genre_type {
  mal_id: number;
  name: string;
}
