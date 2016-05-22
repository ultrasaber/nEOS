// ==UserScript==
// @name        nEOS
// @namespace   neuroticEnvy
// @description neuroticEnvy's Overseer Script
// @include     http://overseer2.com/*
// @version     1
// @grant       none
// ==/UserScript==

var button;
var menuContainer;
var searchItemCatalogFormContainer;
var searchItemCatalogInputBox;
var searchItemCatalogResultSet;

function onLoad()
{
  createNeosElements();
}

function toggleNeosMenu()
{
  if(menuContainer.style.display == "block")
  {
    menuContainer.style.display = "none";
  }
  else
  {
    menuContainer.style.display = "block";
  }
}

function openSearchCatalogForm()
{
  if(searchItemCatalogFormContainer.style.display == "block")
  {
    searchItemCatalogFormContainer.style.display = "none";
  }
  else
  {
    searchItemCatalogFormContainer.style.display = "block";
  }
}

function createNeosElements()
{
  // Create the button to open/close nEOS.
  button = document.createElement("div");
  
  button.style = "background-color:#111;" +
                 "width:50px;" +
                 "height:50px;" +
                 "border:4px #72a0ea solid;" +
                 "border-radius:10px;" +
                 "color:#fff;" +
                 "font-size:4em;" +
                 "text-align:center;" +
                 "line-height:55px;" + 
                 "position:fixed;" +
                 "top:90%;" +
                 "left:1%;";
  button.innerHTML = "♠";
  
  button.addEventListener("click", toggleNeosMenu);
  
  document.getElementsByTagName("body")[0].appendChild(button);
  
  // Create the container for the menu.
  menuContainer = document.createElement("div");
  menuContainer.style = "background-color:#111;" +
                        "width:300px;" +
                        "border:4px #72a0ea solid;" +
                        "border-radius:10px;" +
                        "color:#fff;" +
                        "font-size:1em;" +
                        "position:fixed;" +
                        "top:10%;" +
                        "left:1%;" +
                        "display:none;" +
                        "font-family: Consolas, monospace";
  
  // Create menu header.
  var menuHeader = document.createElement("h1");
  menuHeader.innerHTML = "nEOS v1.01r0413";
  menuHeader.style = "margin:10px 15px;";
  menuContainer.appendChild(menuHeader);
  
  // Create feature list.
  var menuList = document.createElement("ul");
  menuList.style = "list-style:none;";
  
  var searchItemCatalogMenuItem = document.createElement("li")     
  searchItemCatalogMenuItem.innerHTML = "<a href='#' style='text-decoration:none;color:#a0ea72;'>search_item_catalogue()</a>";
  searchItemCatalogMenuItem.addEventListener("click", openSearchCatalogForm);
  menuList.appendChild(searchItemCatalogMenuItem);
  
  menuContainer.appendChild(menuList);
  
  document.getElementsByTagName("body")[0].appendChild(menuContainer);
  
  // Create Search Item Catalog form.
  searchItemCatalogFormContainer = document.createElement("div");
  searchItemCatalogFormContainer.style = "background-color:#111;" +
                                         "border:4px #333 solid;" +
                                         "color:#fff;" +
                                         "font-size:1em;" +
                                         "font-family: Consolas, monospace;" +
                                         "display:none;" +
                                         "padding:10px;";
  searchItemCatalogFormContainer.innerHTML = "<p style='margin:0px;'>Search item catalogue:</p>";
  
  searchItemCatalogInputBox = document.createElement("input");
  searchItemCatalogInputBox.type = "text";
  searchItemCatalogInputBox.placeholder = "Enter item name (leave blank to display entire catalogue)...";
  searchItemCatalogInputBox.size = 50;
  searchItemCatalogFormContainer.appendChild(searchItemCatalogInputBox);
  
  var searchItemCatalogButton = document.createElement("input");
  searchItemCatalogButton.type = "button";
  searchItemCatalogButton.value = "Search!";
  searchItemCatalogButton.addEventListener("click", searchItemCatalog);
  searchItemCatalogFormContainer.appendChild(searchItemCatalogButton);
  
  document.getElementById("content-area").appendChild(searchItemCatalogFormContainer);
}

function searchItemCatalog()
{
  var catalogItems = document.getElementsByTagName("option");
  
  searchItemCatalogResultSet = document.createElement("ul");
  
  for(var i = 0; i < catalogItems.length; i++)
  {
    if(catalogItems[i].text.toLowerCase().includes(searchItemCatalogInputBox.value.toLowerCase()))
    {
      var itemListEntry = document.createElement("li");
      itemListEntry.innerHTML = catalogItems[i].text + " - Value: ";
      
      var itemListEntryValue = document.createElement("a");
      itemListEntryValue.innerHTML = catalogItems[i].value;
      itemListEntryValue.href = "#";
      itemListEntryValue.addEventListener("click", 
                                          function()
                                          {
                                            selectCatalogItem(this.innerHTML);
                                          }
                                         );
      itemListEntry.appendChild(itemListEntryValue);
      
      searchItemCatalogResultSet.appendChild(itemListEntry);
    }
  }
  
  try
  {
    searchItemCatalogFormContainer.removeChild(searchItemCatalogFormContainer.getElementsByTagName("ul")[0]);
  }
  catch(e){}
  
  searchItemCatalogFormContainer.appendChild(searchItemCatalogResultSet);
}

function selectCatalogItem(itemNumber)
{
  document.getElementsByName("item")[0].value = itemNumber;
}

document.addEventListener("DOMContentLoaded", onLoad);