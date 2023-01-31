# CustomerManagementAPI

This system is developed by Lucas Elley and is the final assignment required to pass the final exam. 


The goal of this system is to manage data which holds certain information regarding the current standing of customers (Businesses & Departments). It is a requirement that the data is safe, and therefore the implementation of certain security aspects was made. The identity provider was chosen to be the Microsoft Azure Active Directory platform. In addition, it was a requirement that some form of logging was present in the system, with the intention of being able to see earlier iterations of each business/department in combination with the user that was responsible for that specific iteration. 

To restrict the data manipulation (CRUD-Operations), a RBAC approach was implemented. This is done by checking the users group claims and authorizing users who posses the required group ID. 

The system contains a backend API and a simple frontend for the user to manipulate the data to the extent of their permissions. 


Technologies used:

Microsoft Azure Active Directory

Backend API:

* .NET

* EF Core

* Authentication & Authorization

Frontend:

* Angular

* MSAL
