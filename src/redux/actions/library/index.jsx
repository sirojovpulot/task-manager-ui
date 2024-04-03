import * as types from "../../constants/library/index.js";
import {createAction} from "@reduxjs/toolkit";



export const getReportByPeriodId = createAction(types.GET_REPORTS_BY_PERIOD_ID);

// category umumiy font
export const getLibraryCategoryUmumiyFond = createAction(types.GET_LIBRARY_UMUMIY_FOND);
export const postLibraryCategoryUmumiyFond = createAction(types.POST_LIBRARY_CATEGORY_UMUMIY_FOND);

// category foydalanuvchilar
export const getLibraryCategoryFoydalanuvchilar = createAction(types.GET_LIBRARY_CATEGORY_FOYDALANUVCHILAR);
export const postLibraryCategoryFoydalanuvchilar = createAction(types.POST_LIBRARY_CATEGORY_FOYDALANUVCHILAR);

// category raqamlashtirish
export const getLibraryCategoryRaqamlashtirish = createAction(types.GET_LIBRARY_CATEGORY_RAQAMLASHTIRISH);
export const postLibraryCategoryRaqamlashtirish = createAction(types.POST_LIBRARY_CATEGORY_RAQAMLASHTIRISH);

// category tadbir
export const getLibraryCategoryTadbir = createAction(types.GET_LIBRARY_CATEGORY_TADBIR);
export const postLibraryCategoryTadbir = createAction(types.POST_LIBRARY_CATEGORY_TADBIR);

// category kadr
export const getLibraryCategoryKadr = createAction(types.GET_LIBRARY_CATEGORY_KADR);
export const postLibraryCategoryKadr = createAction(types.POST_LIBRARY_CATEGORY_KADR);

// category xatlov
export const getLibraryCategoryXatlov = createAction(types.GET_LIBRARY_CATEGORY_XATLOV);
export const postLibraryCategoryXatlov = createAction(types.POST_LIBRARY_CATEGORY_XATLOV);

// category user-services
export const getLibraryCategoryUserServices = createAction(types.GET_LIBRARY_CATEGORY_USER_SERVICES);
export const postLibraryCategoryUserServices = createAction(types.POST_LIBRARY_CATEGORY_USER_SERVICES);

// category data-money
export const getLibraryCategoryDataMoney = createAction(types.GET_LIBRARY_CATEGORY_DATA_MONEY);
export const postLibraryCategoryDataMoney = createAction(types.POST_LIBRARY_CATEGORY_DATA_MONEY);

// category bino
export const getLibraryCategoryBino = createAction(types.GET_LIBRARY_CATEGORY_BINO);
export const postLibraryCategoryBino = createAction(types.POST_LIBRARY_CATEGORY_BINO);

// category moddiy-texnik-baza
export const getLibraryCategoryModdiyTexnikBaza = createAction(types.GET_LIBRARY_CATEGORY_MODDIY_TEXNIK_BAZA);
export const postLibraryCategoryModdiyTexnikBaza = createAction(types.POST_LIBRARY_CATEGORY_MODDIY_TEXNIK_BAZA);

// category social-media
export const getLibraryCategorySocialMedia = createAction(types.GET_LIBRARY_CATEGORY_SOCIAL_MEDIA);
export const postLibraryCategorySocialMedia = createAction(types.POST_LIBRARY_CATEGORY_SOCIAL_MEDIA);

// category internet
export const getLibraryCategoryInternet = createAction(types.GET_LIBRARY_CATEGORY_INTERNET);
export const postLibraryCategoryInternet = createAction(types.POST_LIBRARY_CATEGORY_INTERNET);

// category shtat
export const getLibraryCategoryShtat = createAction(types.GET_LIBRARY_CATEGORY_SHTAT);
export const postLibraryCategoryShtat = createAction(types.POST_LIBRARY_CATEGORY_SHTAT);

// update all state
export const updateLibraryState  = createAction(types.UPDATE_LIBRARY_STATE);