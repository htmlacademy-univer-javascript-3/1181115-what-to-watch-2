import { configureMockStore } from '@jedmao/redux-mock-store';
import { createAPI } from '../services/api';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { Action } from '@reduxjs/toolkit';
import { State } from '../types/state';
import {
  AppThunkDispatch,
  extractActionsTypes,
  filmInfo, filmReview,
  generateFilmReviewArr,
  promoFilmInfo,
  userAuthData,
  userInfo
} from '../utils/mock-data';
import {
  fetchFilmsAction,
  fetchPromoAction,
  fetchFavoriteFilmsAction,
  loginAction,
  logoutAction,
  fetchFilmAction,
  fetchComentsAction,
  fetchSimilarFilmsAction,
  sendCommentAction,
  addFilmToFavoriteAction,
  removeFilmToFavoriteAction,
  verifyToken
} from './api-actions';
import { APIRoute, FavoriteFilmStatus } from '../consts';
import { generateFilmsArray } from '../utils/mock-data';
import * as tokenStorage from '../services/token';
import { redirectToRoute } from './action';

describe('Async actions', () => {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);

  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator();
  });

  describe('fetchFilmsAction', () => {
    it('should dispatch "fetchFilmsAction.pending", "fetchFilmsAction.fulfilled" when server response 200', async () => {
      const films = generateFilmsArray(25);
      mockAxiosAdapter.onGet(APIRoute.Films).reply(200, films);

      await store.dispatch(fetchFilmsAction());

      const emittedActions = store.getActions();
      const actions = extractActionsTypes(emittedActions);
      const fetchFilmsActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchFilmsAction.fulfilled>;

      expect(actions).toEqual([
        fetchFilmsAction.pending.type,
        fetchFilmsAction.fulfilled.type,
      ]);

      expect(fetchFilmsActionFulfilled.payload).toEqual(films);
    });

    it('should dispatch "fetchFilmsAction.pending", "fetchFilmsAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet(APIRoute.Films).reply(400, undefined);

      await store.dispatch(fetchFilmsAction());

      const emittedActions = store.getActions();
      const actions = extractActionsTypes(emittedActions);
      const fetchFilmsActionRejected = emittedActions.at(1) as ReturnType<typeof fetchFilmsAction.rejected>;

      expect(actions).toEqual([
        fetchFilmsAction.pending.type,
        fetchFilmsAction.rejected.type,
      ]);

      expect(fetchFilmsActionRejected.payload).toEqual(undefined);
    });
  });

  describe('fetchPromoAction', () => {
    it('should dispatch "fetchPromoAction.pending", "fetchPromoAction.fulfilled" when server response 200', async () => {
      const promoFilm = promoFilmInfo();
      mockAxiosAdapter.onGet(APIRoute.Promo).reply(200, promoFilm);

      await store.dispatch(fetchPromoAction());

      const emittedActions = store.getActions();
      const actions = extractActionsTypes(emittedActions);
      const fetchPromoFilmActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchPromoAction.fulfilled>;

      expect(actions).toEqual([
        fetchPromoAction.pending.type,
        fetchPromoAction.fulfilled.type,
      ]);

      expect(fetchPromoFilmActionFulfilled.payload).toEqual(promoFilm);
    });
  });

  describe('fetchFavoriteFilmsAction', () => {
    it('should dispatch "fetchFavoriteFilmsAction.pending", "fetchFavoriteFilmsAction.fulfilled" when server response 200', async () => {
      const filmsInMyList = generateFilmsArray(7);
      mockAxiosAdapter.onGet(APIRoute.Favorite).reply(200, filmsInMyList);

      await store.dispatch(fetchFavoriteFilmsAction());

      const emittedActions = store.getActions();
      const actions = extractActionsTypes(emittedActions);
      const fetchFavoriteFilmsActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchFavoriteFilmsAction.fulfilled>;

      expect(actions).toEqual([
        fetchFavoriteFilmsAction.pending.type,
        fetchFavoriteFilmsAction.fulfilled.type,
      ]);

      expect(fetchFavoriteFilmsActionFulfilled.payload).toEqual(filmsInMyList);
    });
  });

  describe('loginAction', () => {
    const user = userAuthData();
    const serverReplay = { token: 'secret' };

    it('should dispatch "loginAction.pending", "loginAction.fulfilled" when server response 200', async () => {
      mockAxiosAdapter.onPost(APIRoute.Login).reply(200, serverReplay);

      await store.dispatch(loginAction(user));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        loginAction.pending.type,
        redirectToRoute.type,
        loginAction.fulfilled.type,
      ]);
    });

    it('should call "saveToken" once with the received token', async () => {
      mockAxiosAdapter.onPost(APIRoute.Login).reply(200, serverReplay);
      const mockSaveToken = vi.spyOn(tokenStorage, 'saveToken');

      await store.dispatch(loginAction(user));

      expect(mockSaveToken).toBeCalledTimes(1);
      expect(mockSaveToken).toBeCalledWith(serverReplay.token);
    });
  });

  describe('logoutAction', () => {
    it('should dispatch "logoutAction.pending", "logoutAction.fulfilled" when server response 204', async() => {
      mockAxiosAdapter.onDelete(APIRoute.Logout).reply(204);

      await store.dispatch(logoutAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        logoutAction.pending.type,
        logoutAction.fulfilled.type,
      ]);
    });

    it('should one call "dropToken" with "logoutAction"', async () => {
      mockAxiosAdapter.onDelete(APIRoute.Logout).reply(204);
      const mockDropToken = vi.spyOn(tokenStorage, 'dropToken');

      await store.dispatch(logoutAction());

      expect(mockDropToken).toBeCalledTimes(1);
    });
  });

  describe('fetchFilmAction', () => {
    const film = filmInfo();
    const { id } = film;

    it('should dispatch "fetchFilmAction.pending", "fetchFilmAction.fulfilled" when server response 200', async () => {
      mockAxiosAdapter.onGet(`${APIRoute.Films}/${id}`).reply(200, film);

      await store.dispatch(fetchFilmAction(id));
      const emittedActions = store.getActions();
      const actions = extractActionsTypes(emittedActions);
      const fetchFilmActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchFilmAction.fulfilled>;

      expect(actions).toEqual([
        fetchFilmAction.pending.type,
        fetchFilmAction.fulfilled.type,
      ]);

      expect(fetchFilmActionFulfilled.payload).toEqual(film);
    });

    it('should dispatch "fetchFilmAction.pending", "fetchFilmAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet(`${APIRoute.Films}/${id}`).reply(400, undefined);

      await store.dispatch(fetchFilmAction(id));
      const emittedActions = store.getActions();
      const actions = extractActionsTypes(emittedActions);
      const fetchFilmActionRejected = emittedActions.at(1) as ReturnType<typeof fetchFilmAction.rejected>;

      expect(actions).toEqual([
        fetchFilmAction.pending.type,
        fetchFilmAction.rejected.type,
      ]);

      expect(fetchFilmActionRejected.payload).toEqual(undefined);
    });
  });

  describe('fetchComentsAction', () => {
    const film = filmInfo();
    const { id } = film;

    it('should dispatch "fetchComentsAction.pending", "fetchComentsAction.fulfilled" when server response 200', async () => {
      const comments = generateFilmReviewArr(5);

      mockAxiosAdapter.onGet(`${APIRoute.Comments}/${id}`).reply(200, comments);

      await store.dispatch(fetchComentsAction(id));
      const emittedActions = store.getActions();
      const actions = extractActionsTypes(emittedActions);
      const fetchComentsActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchComentsAction.fulfilled>;

      expect(actions).toEqual([
        fetchComentsAction.pending.type,
        fetchComentsAction.fulfilled.type,
      ]);

      expect(fetchComentsActionFulfilled.payload).toEqual(comments);
    });

    it('should dispatch "fetchComentsAction.pending", "fetchComentsAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet(`${APIRoute.Comments}/${id}`).reply(400, undefined);

      await store.dispatch(fetchComentsAction(id));
      const emittedActions = store.getActions();
      const actions = extractActionsTypes(emittedActions);
      const fetchComentsActionRejected = emittedActions.at(1) as ReturnType<typeof fetchComentsAction.rejected>;

      expect(actions).toEqual([
        fetchComentsAction.pending.type,
        fetchComentsAction.rejected.type,
      ]);

      expect(fetchComentsActionRejected.payload).toEqual(undefined);
    });
  });

  describe('fetchSimilarFilmsAction', () => {
    const film = filmInfo();
    const { id } = film;

    it('should dispatch "fetchSimilarFilmsAction.pending", "fetchSimilarFilmsAction.fulfilled" when server response 200', async () => {
      const similarFilms = generateFilmsArray(4);

      mockAxiosAdapter.onGet(`${APIRoute.Films}/${id}/similar`).reply(200, similarFilms);

      await store.dispatch(fetchSimilarFilmsAction(id));
      const emittedActions = store.getActions();
      const actions = extractActionsTypes(emittedActions);
      const fetchSimilarFilmsActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchSimilarFilmsAction.fulfilled>;

      expect(actions).toEqual([
        fetchSimilarFilmsAction.pending.type,
        fetchSimilarFilmsAction.fulfilled.type,
      ]);

      expect(fetchSimilarFilmsActionFulfilled.payload).toEqual(similarFilms);
    });

    it('should dispatch "fetchSimilarFilmsAction.pending", "fetchSimilarFilmsAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet(`${APIRoute.Films}/${id}/similar`).reply(400, undefined);

      await store.dispatch(fetchSimilarFilmsAction(id));
      const emittedActions = store.getActions();
      const actions = extractActionsTypes(emittedActions);
      const fetchSimilarFilmsActionRejected = emittedActions.at(1) as ReturnType<typeof fetchSimilarFilmsAction.rejected>;

      expect(actions).toEqual([
        fetchSimilarFilmsAction.pending.type,
        fetchSimilarFilmsAction.rejected.type,
      ]);

      expect(fetchSimilarFilmsActionRejected.payload).toEqual(undefined);
    });
  });

  describe('sendCommentAction', () => {
    const film = filmInfo();
    const { id } = film;
    const fakerComment = filmReview();
    const { comment, rating } = fakerComment;

    it('should dispatch "sendCommentAction.pending", "sendCommentAction.fulfilled" when server response 201', async () => {
      mockAxiosAdapter.onPost(`${APIRoute.Comments}/${id}`).reply(201, fakerComment);

      await store.dispatch(sendCommentAction({ id, comment, rating }));
      const emittedActions = store.getActions();
      const actions = extractActionsTypes(emittedActions);
      const sendCommentActionFulfilled = emittedActions.at(2) as ReturnType<typeof sendCommentAction.fulfilled>;

      expect(actions).toEqual([
        sendCommentAction.pending.type,
        redirectToRoute.type,
        sendCommentAction.fulfilled.type,
      ]);

      expect(sendCommentActionFulfilled.payload).toEqual(fakerComment);
    });

    it('should dispatch "sendCommentAction.pending", "sendCommentAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onPost(`${APIRoute.Comments}/${id}`).reply(400, undefined);

      await store.dispatch(sendCommentAction({id, comment, rating}));
      const emittedActions = store.getActions();
      const actions = extractActionsTypes(emittedActions);
      const sendCommentActionRejected = emittedActions.at(1) as ReturnType<typeof sendCommentAction.rejected>;

      expect(actions).toEqual([
        sendCommentAction.pending.type,
        sendCommentAction.rejected.type,
      ]);

      expect(sendCommentActionRejected.payload).toEqual(undefined);
    });
  });

  describe('addFilmToFavoriteAction', () => {
    let film = filmInfo();
    film = {
      ...film,
      isFavorite: true
    };

    const { id } = film;

    it('should dispatch "addFilmToFavoriteAction.pending", "addFilmToFavoriteAction.fulfilled" when server response 201', async () => {
      mockAxiosAdapter.onPost(`${APIRoute.Favorite}/${id}/${FavoriteFilmStatus.AddToFavorite}`).reply(201, film);

      await store.dispatch(addFilmToFavoriteAction(id));
      const emittedActions = store.getActions();
      const actions = extractActionsTypes(emittedActions);
      const addFilmToFavoriteActionFulfilled = emittedActions.at(1) as ReturnType<typeof addFilmToFavoriteAction.fulfilled>;

      expect(actions).toEqual([
        addFilmToFavoriteAction.pending.type,
        addFilmToFavoriteAction.fulfilled.type,
      ]);

      expect(addFilmToFavoriteActionFulfilled.payload).toEqual(film);
    });

    it('should dispatch "addFilmToFavoriteAction.pending", "addFilmToFavoriteAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onPost(`${APIRoute.Favorite}/${id}/${FavoriteFilmStatus.AddToFavorite}`).reply(400, undefined);

      await store.dispatch(addFilmToFavoriteAction(id));
      const emittedActions = store.getActions();
      const actions = extractActionsTypes(emittedActions);
      const addFilmToFavoriteActionRejected = emittedActions.at(1) as ReturnType<typeof addFilmToFavoriteAction.rejected>;

      expect(actions).toEqual([
        addFilmToFavoriteAction.pending.type,
        addFilmToFavoriteAction.rejected.type,
      ]);

      expect(addFilmToFavoriteActionRejected.payload).toEqual(undefined);
    });
  });

  describe('removeFilmToFavoriteAction', () => {
    let film = filmInfo();
    film = {
      ...film,
      isFavorite: false
    };

    const { id } = film;

    it('should dispatch "removeFilmToFavoriteAction.pending", "removeFilmToFavoriteAction.fulfilled" when server response 201', async () => {
      mockAxiosAdapter.onPost(`${APIRoute.Favorite}/${id}/${FavoriteFilmStatus.RemoveFromFavorite}`).reply(200, film);

      await store.dispatch(removeFilmToFavoriteAction(id));
      const emittedActions = store.getActions();
      const actions = extractActionsTypes(emittedActions);
      const removeFilmToFavoriteActionFulfilled = emittedActions.at(1) as ReturnType<typeof removeFilmToFavoriteAction.fulfilled>;

      expect(actions).toEqual([
        removeFilmToFavoriteAction.pending.type,
        removeFilmToFavoriteAction.fulfilled.type,
      ]);

      expect(removeFilmToFavoriteActionFulfilled.payload).toEqual(film);
    });
  });

  describe('verifyToken', () => {
    const user = userInfo();

    it('should dispatch "verifyToken.fullfield" when server response 200', async () => {
      mockAxiosAdapter.onGet(APIRoute.Login).reply(200, user);

      await store.dispatch(verifyToken());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        verifyToken.pending.type,
        verifyToken.fulfilled.type,
      ]);
    });

    it('should one call "dropToken" with "verifyToken.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet(APIRoute.Login).reply(400);
      const mockDropToken = vi.spyOn(tokenStorage, 'dropToken');

      await store.dispatch(verifyToken());

      expect(mockDropToken).toBeCalledTimes(1);
    });
  });
});
