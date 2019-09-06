# import os
# import pandas as pd
import numpy as np
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine
import pymysql
pymysql.install_as_MySQLdb()
 
from flask import Flask, jsonify, render_template, redirect
from flask_sqlalchemy import SQLAlchemy
import mysql.connector
import json
#import simplejson as jsonsimple

# Create an instance of Flask
app = Flask(__name__)


engine = create_engine("mysql://root:#yourpassword#@localhost/kansas_census")
#engine = create_engine(cnx)
conn = engine.connect()


#################################################
# Database Setup
#################################################


# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)

# Save references to each table - add a variable like this for each table
pop = Base.classes.population_tbl
amind_alaskan = Base.classes.amind_alaskan_tbl
white_hisp = Base.classes.white_hisp_tbl
totearnedlvltbl = Base.classes.tot_earn_ed_lev_pop_tbl
ctygender_overalltbl= Base.classes.cty_gender_overall_tbl
raceedu_tbl = Base.classes.race_ed_lvl_tbl


@app.route("/")
def index():
    """Return the homepage."""
    return render_template("index.html")

@app.route("/heatmap/")
def heatmap():
    """Return the map page."""
    return render_template("heatmap.html")

@app.route("/pastdata/")
def pastdata():
    """Return the map page."""
    return render_template("pastdata.html")
    
@app.route("/data/")
def data():
    """Return the map page."""
    return render_template("data.html")

@app.route("/table/")
def table():
    """Return the map page."""
    return render_template("table.html")

@app.route("/comparisons/")
def comparisons():
    """Return the map page."""
    return render_template("comparisons.html")


@app.route("/analysis/")
def analysis():
    """Return the map page."""
    return render_template("analysis.html")

@app.route("/vis_population/")
def vis_population():
    """Return the map page."""
    return render_template("vis_population.html")

@app.route("/countynames")
def countynames():
    """Return a list of sample names."""

    # Use Pandas to perform the sql query
    session = Session(engine)
    counties = session.query(pop.county).all()

    #create a list of counties
    county = list(np.ravel(counties))

    session.close()

    #jsonify dictionary 
    return jsonify(county)

@app.route("/population")
def population():
    """Return a list of sample names."""
    session = Session(engine)
    population = session.query(pop).all()

    #create a dictionary 
    all_pop = []
    for p in population: 
        p_dict = {}
        p_dict["county"] = p.county
        p_dict["population"] = p.population
        p_dict["ID"] = p.ID
        all_pop.append(p_dict)


    session.close()

    #jsonify dictionary 
    return jsonify(all_pop)
 
@app.route("/amindalaskan/")
def amindalaskan():
    """Return a list of sample names."""
    session = Session(engine)
    amindalaskan = session.query(amind_alaskan).all()

    #create a dictionary 
    all_amindalaskans = []
    for a in amindalaskan: 
        a_dict = {}
        a_dict["county"] = a.county
        a_dict["TotalAmIndAKPop"] = a.TotalAmIndAKPop
        a_dict["TotalAmIndAKBach"] = a.TotalAmIndAKBach
        a_dict["MaleAmIndAKPop"] = a.MaleAmIndAKPop
        a_dict["MaleAmIndAkHS"] = a.MaleAmIndAkHS
        a_dict["MaleAmIndAKBach"] = a.MaleAmIndAKBach
        a_dict["FemaleAmIndAKPop"] = a.FemaleAmIndAKPop
        a_dict["FemaleAmIndAKHS"] = a.FemaleAmIndAKHS
        a_dict["FemaleAmIndAKBach"] = a.FemaleAmIndAKBach
        a_dict["TotalAmIndAKHS"] = a.TotalAmIndAKHS
        a_dict["ID"] = a.ID
        all_amindalaskans.append(a_dict)

    session.close()

    #jsonify dictionary 
    return jsonify(all_amindalaskans)

@app.route("/whitehisp/")
def whitehisp():
   """Return a list of sample names."""
   session = Session(engine)
   white_hisp1 = session.query(white_hisp).all()

   #create a dictionary
   all_white_hisp = []
   for wh in white_hisp1:
       wh_dict = {}
       wh_dict["county"] = wh.county
       wh_dict["Total_White_Pop"] = wh.TotalWhitePop
       wh_dict["Total_White_Hisp_Pop"] = wh.TotalWhiteHispPop
       wh_dict["Total_White_Hisp_HS"] = wh.TotalWhiteHispHS
       wh_dict["Total_White_HS"] = wh.TotalWhiteHS
       wh_dict["Total_White_Hisp_Bach"] = wh.TotalWhiteHispBach
       wh_dict["Total_White_Bach"] = wh.TotalWhiteBach
       wh_dict["ID"] = wh.ID
       all_white_hisp.append(wh_dict)

   session.close()
    
    #jsonify dictionary 
   return jsonify(all_white_hisp)
 

@app.route("/totalearnedlevelpop/")
def totalearnedlevelpop():
   """Return a list of sample names."""
   session = Session(engine)
   totalearnedlevelpop1 = session.query(totearnedlvltbl).all()

   #create a dictionary
   all_totalearnedlevelpop = []
   for totepop in totalearnedlevelpop1:
       totearnedpop_dict = {}
       totearnedpop_dict["county"] = totepop.county
       totearnedpop_dict["Latitude"] = totepop.latitude
       totearnedpop_dict["Longitude"] = totepop.longitude
       totearnedpop_dict["Population"] = totepop.population
       totearnedpop_dict["Total_Median_Earnings"] = totepop.Total_Median_Earnings_
       totearnedpop_dict["Total_Median_Earnings_LTHS"] = totepop.Total_Median_Earning_Less_than_HS
       totearnedpop_dict["Total_Median_Earnings_HS"] = totepop.Total_Median_Earning_HS
       totearnedpop_dict["Total_Median_Earnings_Assoc"] = totepop.Total_Median_Earning_Assoc
       totearnedpop_dict["Total_Median_Earnings_Bach"] = totepop.Total_Median_Earning_Bach
       totearnedpop_dict["Total_Median_Earnings_Grad"] = totepop.Total_Median_Earning_Grad
       totearnedpop_dict["Male_Median_Earning"] = totepop.Male_Median_Earnings
       totearnedpop_dict["Male_Median_Earning_LTHS"] = totepop.Male_Median_Earning_Less_than_HS
       totearnedpop_dict["Male_Median_Earning_HS"] = totepop.Male_Median_Earning_HS
       totearnedpop_dict["Male_Median_Earning_Assoc"] = totepop.Male_Median_Earning_Assoc
       totearnedpop_dict["Male_Median_Earning_Bach"] = totepop.Male_Median_Earning_Bach
       totearnedpop_dict["Male_Median_Earning_Grad"] = totepop.Male_Median_Earning_Grad
       totearnedpop_dict["Female_Median_Earning"] = totepop.Female_Median_Earnings
       totearnedpop_dict["Female_Median_Earning_LTHS"] = totepop.Female_Median_Earning_Less_than_HS
       totearnedpop_dict["Female_Median_Earning_HS"] = totepop.Female_Median_Earning_HS
       totearnedpop_dict["Female_Median_Earning_Assoc"] = totepop.Female_Median_Earning_Assoc
       totearnedpop_dict["Female_Median_Earning_Bach"] = totepop.Female_Median_Earning_Bach
       totearnedpop_dict["Female_Median_Earning_Grad"] = totepop.Female_Median_Earning_Grad
       totearnedpop_dict["ID"] = totepop.ID
       all_totalearnedlevelpop.append(totearnedpop_dict)
   session.close() 
   
    #jsonify dictionary 
   return jsonify(all_totalearnedlevelpop)

@app.route("/genderoverall/")
def genderoverall():
    """Return a list of sample names."""
    session = Session(engine)
    genderoverall = session.query(ctygender_overalltbl).all()

    #create a dictionary 
    all_gender = []
    for g in genderoverall: 
        g_dict = {}
        g_dict["county"] = g.county
        g_dict["TotalPop25Plus"] = g.TotalPop25Plus
        g_dict["MalePop25Plus"] = g.MalePop25Plus
        g_dict["FemalePop25Plus"] = g.FemalePop25Plus
        g_dict["TotalMedianEarnings"] = g.TotalMedianEarnings
        g_dict["MaleMedianEarnings"] = g.MaleMedianEarnings
        g_dict["FemaleMedianEarnings"] = g.FemaleMedianEarnings
        all_gender.append(g_dict)

    session.close()
    
    #jsonify dictionary 
    return jsonify(all_gender)
   
@app.route("/raceedu/")
def raceedu():
    """Return a list of sample names."""
    session = Session(engine)
    raceedu = session.query(raceedu_tbl).all()

    #create a dictionary 
    all_raceedu = []
    for r in raceedu: 
        r_dict = {}
        r_dict["county"] =r.county
        r_dict["population"] = r.population
        r_dict["Total_Pop_25Plus"] =r.Total_Pop_25Plus
        r_dict["Total_White_Pop"] =r.Total_White_Pop
        r_dict["Total_White_HS"] =r.Total_White_HS
        r_dict["Total_White_Bach"] =r.Total_White_Bach
        r_dict["Total_Black_Pop"] =r.Total_Black_Pop
        r_dict["Total_Black_HS"] =r.Total_Black_HS
        r_dict["Total_Black_Bach"] =r.Total_Black_Bach
        r_dict["Total_AmIndAK_Pop"] =r.Total_AmIndAK_Pop
        r_dict["Total_AmIndAK_HS"] =r.Total_AmIndAK_HS
        r_dict["Total_AmIndAK_Bach"] =r.Total_AmIndAK_Bach
        r_dict["Total_Asian_Pop"] =r.Total_Asian_Pop
        r_dict["Total_Asian_HS"] =r.Total_Asian_HS
        r_dict["Total_Asian_Bach"] =r.Total_Asian_Bach
        r_dict["Total_HI0PI_Pop"] =r.Total_HI0PI_Pop
        r_dict["Total_HI0PI_HS"] =r.Total_HI0PI_HS
        r_dict["Total_HI0PI_Bach"] =r.Total_HI0PI_Bach
        r_dict["Total_Hisp_Pop"] =r.Total_Hisp_Pop
        r_dict["Total_Hisp_HS"] =r.Total_Hisp_HS
        r_dict["Total_Hisp_Bach"] =r.Total_Hisp_Bach
        r_dict["Total_Multi_Pop"] =r.Total_Multi_Pop
        r_dict["Total_Multi_HS"] =r.Total_Multi_HS
        r_dict["Total_Multi_Bach"] =r.Total_Multi_Bach
        r_dict["Total_Other_Pop"] =r.Total_Other_Pop
        r_dict["Total_Other_HS"] =r.Total_Other_HS
        r_dict["Total_Other_Bach"] =r.Total_Other_Bach
        r_dict["ID"] =r.ID
        all_raceedu.append(r_dict)

    session.close()

    #jsonify dictionary 
    return jsonify(all_raceedu)

if __name__ == "__main__":
#     port = int(os.environ.get('PORT' 5000))
#     print('here')
#     app.run(port=8500)
    app.run(debug = True)
