const API_BASE_URL = 'http://localhost:8080';

export type CreateCategory = {
  // id?: number;
  name: string;
  value: number;
  momentIds?: number[];
}

export type UpdateCategory = {
  id: number;
  name: string;
  value: number;
  momentIds?: number[];
}

export type ListCategory = {
  id: number;
  name: string;
  value: number;
  moments: {
    id: number;
    name: string;
  }[];
}

export type FindCategory ={
  id: number;
  name: string;
  value: number;
  moments:{
    id: number;
    name: string;
  }[];
}

export type ListMoment = {
  id: number;
  name: string;
}

export type CreateMoment = {
  name: string;
}

export type UpdateMoment = {
  id: number;
  name: string;
}

export type FindMoment = {
  id: number;
  name: string;
}

export type ListBand = {
  id: number;
  name: string;
}

export type CreateBand = {
  name: string;
}

export type UpdateBand = {
  id: number;
  name: string;
}

export type FindBand = {
  id: number;
  name: string;
}

export type ListMusicTemperature = {
  id: number;
  name: string;
}

export type CreateMusicTemperature = {
  name: string;
}

export type UpdateMusicTemperature = {
  id: number;
  name: string;
}

export type FindMusicTemperature = {
  id: number;
  name: string;
}

export type ListMusic = {
  id: number;
  name: string;
  band: {id:number,name:string};
  moments: {
    id: number;
    name: string;
  }[];
  musicTemperature?: {id:number,name:string};
}

export type CreateMusic = {
  name: string;
  band: {
    id: number;
    name: string;
  };
  momentIds?: number[];
  musicTemperature?:{
    id: number;
  };

}

export type UpdateMusic = {
  id: number;
  name: string;
  band: {
    id: number;
    name: string;
  };
  momentIds?: number[];
  musicTemperature?:{
    id: number;
  };
}

export type FindMusic = {
  id: number;
  name: string;
  band: {
    id: number;
    name: string;
  };
  moments?: {
    id: number;
    name: string;
  }[];
  musicTemperature?:{
    id: number;
    name: string;
  };
}


  async function getErrorMessage(response: Response, fallback: string): Promise<Error> {
    try {
      const body = await response.json();
      const message = body?.detail || body?.message || body?.error || fallback;
      return new Error(message);
    } catch {
      return new Error(fallback);
    }
  }

export const api = {
  async getCategories(): Promise<ListCategory[]> {
    const response = await fetch(`${API_BASE_URL}/categories`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  },

  async getCategoryById(id: string): Promise<FindCategory> {
    const response = await fetch(`${API_BASE_URL}/categories/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  },

  async updateCategory(data: UpdateCategory): Promise<CreateCategory> {
    const response = await fetch(`${API_BASE_URL}/categories`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: data.id,
        name: data.name,
        value: data.value,
        momentIds: data.momentIds || []
      }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  },

  async createCategory(data: CreateCategory): Promise<CreateCategory> {
    const response = await fetch(`${API_BASE_URL}/categories`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: data.name,
        value: data.value,
        momentIds: data.momentIds || []
      }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  },

  async deleteCategory(id: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/categories/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  },

  async getMoments(): Promise<ListMoment[]> {
    const response = await fetch(`${API_BASE_URL}/moments`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  },

  async getMomentById(id: string): Promise<FindMoment> {
    const response = await fetch(`${API_BASE_URL}/moments/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  },

  async createMoment(data: CreateMoment): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/moments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  },

  async updateMoment(data: UpdateMoment): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/moments`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  },

  async deleteMoment(id: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/moments/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  },

  async getMusic(): Promise<ListMusic[]> {
    const response = await fetch(`${API_BASE_URL}/musics`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  },

  async getMusicById(id: string): Promise<FindMusic> {
    const response = await fetch(`${API_BASE_URL}/musics/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  },

  async createMusic(data: CreateMusic): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/musics`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw await getErrorMessage(response, 'Erro ao criar música');
    }
  },

  async updateMusic(data: UpdateMusic): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/musics`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw await getErrorMessage(response, 'Erro ao atualizar música');
    }
  },

  async deleteMusic(id: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/musics/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  },

  async getBands(): Promise<ListBand[]> {
    const response = await fetch(`${API_BASE_URL}/bands`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  },

  async getBandById(id: string): Promise<FindBand> {
    const response = await fetch(`${API_BASE_URL}/bands/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  },

  async createBand(data: CreateBand): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/bands`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  },

  async updateBand(data: UpdateBand): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/bands`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  },

  async deleteBand(id: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/bands/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  },

  async getMusicTemperatures(): Promise<ListMusicTemperature[]> {
    const response = await fetch(`${API_BASE_URL}/music-temperatures`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  },

  async getMusicTemperatureById(id: string): Promise<FindMusicTemperature> {
    const response = await fetch(`${API_BASE_URL}/music-temperatures/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  },

  async createMusicTemperature(data: CreateMusicTemperature): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/music-temperatures`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  },

  async updateMusicTemperature(data: UpdateMusicTemperature): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/music-temperatures`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  },

  async deleteMusicTemperature(id: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/music-temperatures/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  }
};
