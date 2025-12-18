const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

const handleResponse = async (response) => {
  if (!response.ok) {
    let errorMessage = 'Ошибка сервера';
    try {
      const error = await response.json();
      errorMessage = error.message || error.error || errorMessage;
    } catch (e) {
      // Не удалось распарсить JSON
    }
    throw new Error(errorMessage);
  }
  
  // Для DELETE запросов может не быть тела
  if (response.status === 204) {
    return null;
  }
  
  return response.json();
};

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { 'Authorization': `Bearer ${token}` } : {};
};

export const authAPI = {
  login: async (email, password) => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    return handleResponse(response);
  },

  register: async (userData) => {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    return handleResponse(response);
  },

  getProfile: async () => {
    const response = await fetch(`${API_URL}/auth/profile`, {
      headers: { ...getAuthHeader() }
    });
    return handleResponse(response);
  },

  updateProfile: async (userData) => {
    const response = await fetch(`${API_URL}/auth/profile`, {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json',
        ...getAuthHeader()
      },
      body: JSON.stringify(userData)
    });
    return handleResponse(response);
  }
};

export const recipesAPI = {
  getAll: async (page = 0, size = 10, filters = {}) => {
    const params = new URLSearchParams({
      page: page.toString(),
      size: size.toString(),
      ...filters
    });
    
    const response = await fetch(`${API_URL}/recipes?${params}`);
    return handleResponse(response);
  },

  getById: async (id) => {
    const response = await fetch(`${API_URL}/recipes/${id}`);
    return handleResponse(response);
  },

  create: async (recipe) => {
    const response = await fetch(`${API_URL}/recipes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader()
      },
      body: JSON.stringify(recipe)
    });
    return handleResponse(response);
  },

  update: async (id, recipe) => {
    const response = await fetch(`${API_URL}/recipes/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader()
      },
      body: JSON.stringify(recipe)
    });
    return handleResponse(response);
  },

  delete: async (id) => {
    const response = await fetch(`${API_URL}/recipes/${id}`, {
      method: 'DELETE',
      headers: getAuthHeader()
    });
    return handleResponse(response);
  },

  search: async (query, filters = {}) => {
    const params = new URLSearchParams({ 
      q: query,
      ...filters 
    });
    const response = await fetch(`${API_URL}/recipes/search?${params}`);
    return handleResponse(response);
  },

  getUserRecipes: async () => {
    const response = await fetch(`${API_URL}/recipes/my`, {
      headers: getAuthHeader()
    });
    return handleResponse(response);
  }
};

export const categoriesAPI = {
  getAll: async () => {
    const response = await fetch(`${API_URL}/categories`);
    return handleResponse(response);
  },

  create: async (category) => {
    const response = await fetch(`${API_URL}/categories`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader()
      },
      body: JSON.stringify(category)
    });
    return handleResponse(response);
  },

  update: async (id, category) => {
    const response = await fetch(`${API_URL}/categories/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader()
      },
      body: JSON.stringify(category)
    });
    return handleResponse(response);
  },

  delete: async (id) => {
    const response = await fetch(`${API_URL}/categories/${id}`, {
      method: 'DELETE',
      headers: getAuthHeader()
    });
    return handleResponse(response);
  }
};

export const favoritesAPI = {
  getFavorites: async () => {
    const response = await fetch(`${API_URL}/favorites`, {
      headers: getAuthHeader()
    });
    return handleResponse(response);
  },

  addToFavorites: async (recipeId) => {
    const response = await fetch(`${API_URL}/favorites/${recipeId}`, {
      method: 'POST',
      headers: getAuthHeader()
    });
    return handleResponse(response);
  },

  removeFromFavorites: async (recipeId) => {
    const response = await fetch(`${API_URL}/favorites/${recipeId}`, {
      method: 'DELETE',
      headers: getAuthHeader()
    });
    return handleResponse(response);
  },

  checkFavorite: async (recipeId) => {
    const response = await fetch(`${API_URL}/favorites/${recipeId}/check`, {
      headers: getAuthHeader()
    });
    return handleResponse(response);
  }
};

export const tagsAPI = {
  getAll: async () => {
    const response = await fetch(`${API_URL}/tags`);
    return handleResponse(response);
  },

  create: async (tag) => {
    const response = await fetch(`${API_URL}/tags`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader()
      },
      body: JSON.stringify(tag)
    });
    return handleResponse(response);
  },

  delete: async (id) => {
    const response = await fetch(`${API_URL}/tags/${id}`, {
      method: 'DELETE',
      headers: getAuthHeader()
    });
    return handleResponse(response);
  }
};