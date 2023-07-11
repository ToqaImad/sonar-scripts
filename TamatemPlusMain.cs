using System.Collections;
using System.Collections.Generic;
using Unity.VisualScripting;
using UnityEngine;
using UnityEngine.Events;

namespace TamatemPlus
{
    public class TamatemPlusMain : MonoBehaviour
    {
        public static TamatemPlusMain Instance;
​
        private void Awake()
        {
            if (Instance != null && Instance != this)
            {
                Destroy(gameObject);
                return;
            }
            Instance = this;
​
        }
​
        private void Start()
        {
            this.gameObject.AddComponent<APIHandler>();
            this.gameObject.AddComponent<Authorization>();
            this.gameObject.AddComponent<GetToken>();
            this.gameObject.AddComponent<ConnectPlayerID>();
            this.gameObject.AddComponent<GetInventoryItems>();
            this.gameObject.AddComponent<GetUserInfo>();
            this.gameObject.AddComponent<RedeemAll>();
            this.gameObject.AddComponent<RedeemItem>();
            this.gameObject.AddComponent<Logout>();
        }
​
        public UnityAction<bool> OnUserConnected;
        public UnityAction<RootGetUserInfoResponse> OnGetUserInfo;
        public UnityAction<RootGetInventoryItemsResponse> OnGetInventoryItems;
        public UnityAction<bool, string> OnItemRedeemed;
        public UnityAction<RootRedeemAllResponse> OnRedeemAll;
        public UnityAction OnLogout;
​
        #region public functions
​
        public void Connect()
        {
            this.gameObject.GetComponent<Authorization>().StartAuthorization();
        }
​
        public void GetUserInfo()
        {
            this.gameObject.GetComponent<GetUserInfo>().StartGetUserInfo();
        }
​
        public void GetInventoryItems()
        {
            this.gameObject.GetComponent<GetInventoryItems>().StartGetInventoryItems();
        }
​
        public void RedeemAll()
        {
            this.gameObject.GetComponent<RedeemAll>().StartRedeemAll();
        }
​
        public void Logout()
        {
            this.gameObject.GetComponent<Logout>().StartLogout();
        }
        #endregion
​
        #region callbacks
​
        public void UpdateConnect(bool state)
        {
            OnUserConnected?.Invoke(state);
            Debug.Log("USER CONNECTION STATE FROM SINGLETON " + state);
        }
​
        public void UpdateGetUserInfo(RootGetUserInfoResponse userInfo)
        {
            OnGetUserInfo?.Invoke(userInfo);
        }
​
        public void UpdateGetInventoryItems(RootGetInventoryItemsResponse inventoryItems)
        {
            OnGetInventoryItems?.Invoke(inventoryItems);
        }
​
        public void UpdateRedeemItem(bool state, string verificationToken)
        {
            OnItemRedeemed?.Invoke(state, verificationToken);
        }
​
        public void UpdateRedeemAll(RootRedeemAllResponse redeemAllResponse)
        {
            OnRedeemAll?.Invoke(redeemAllResponse);
        }
​
        public void UpdateLogout()
        {
            PlayerPrefs.SetString("TamatemAccessToken", "");
            PlayerPrefs.SetInt("TamatemPlayerID", 0);
            OnLogout?.Invoke();
        }
​
        #endregion
    }
}