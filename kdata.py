#!/usr/bin/python
# -*- coding: utf-8 -*-


import requests
import base64 


def encode_str(str1):
    message_bytes = str1.encode('utf-8')
    base64_bytes = base64.b64encode(message_bytes)
    base64_message = base64_bytes.decode('utf-8')
    return base64_message


def get_access_token(client_id, client_secret):
    
    sec1 = encode_str(client_id+":"+client_secret)
        
    header = {"Authorization": "Basic "+sec1,
              "Content-Type": "application/x-www-form-urlencoded"}
    
    
    params={"grant_type":"client_credentials",
            "scope": "product.compact"           
        }
    
    
    url ="https://api.kroger.com/v1/connect/oauth2/token"
    access_token = requests.post(url, headers= header, params=params).json()['access_token']
        
    return access_token



def getLocations(access_token, zip_code):
    

    header = {"Authorization": "Bearer "+access_token,
              "Accept": "application/json"
        }
    
    params ={"filter.zipCode.near":zip_code,
             "filter.limit":200
        } 
    
    
    loction_url = "https://api.kroger.com/v1/locations"
    response = requests.get(loction_url, headers = header, params = params).json()['data']
    
    return response 
    

def searchProduct(access_token, search_query, loc_id, start_indice):
    header = {"Authorization": "Bearer "+access_token,
              "Accept": "application/json"
        }
    
    params ={"filter.term":search_query,
             "filter.locationId": loc_id,
             "filter.start":start_indice,
             "filter.limit":5
        } 
    prod_url = "https://api.kroger.com/v1/products"
    response = requests.get(prod_url, headers = header, params = params).json()['data']
    
    return response
     






def main():
    
    client_id= "ssidekick-2cd8cc8f79a346aff145f7f504c055bd6006646597219737506"
    client_secret="tFjRQxZBXLvXzMPOrRuRrY1cncoUEIO689o1pCpt" 

    access_token = get_access_token(client_id, client_secret)

    zip_code = input("Please Enter Zip Code \n>")
    
    search_query =input("Please Enter search query \n>")
    
    locations = getLocations(access_token, zip_code)
    
    
    max_res = 25
    max_res_reached = False
    
    for loc in locations :
        
        
        prods = searchProduct(access_token, search_query, loc["locationId"], 1)
        if len(prods) !=0:
            
            print ("\n####  "+loc['name']+' ---- '+', '.join(list(loc['address'].values())))
            for prod in prods :
                
                print ("-ID: "+prod['productId']+' -SIZE: '+prod["items"][0]['size']+'  -IN STORE:  '+str(prod["items"][0]['fulfillment']['inStore']))
                max_res-=1
                if max_res ==0:
                    max_res_reached=True 
                
                if max_res_reached :
                    break
        if max_res_reached :
            break            
        
        
    
    
    

if __name__ == '__main__':
    main()


    
    

