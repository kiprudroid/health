import {render, html} from 'https://unpkg.com/uhtml?module';

const API_BASE = 'https://coronavirus-monitor.p.rapidapi.com/coronavirus';

// fetcher
const json = res => res.json(); 
const details = {
  headers: {
    'x-rapidapi-host': 'coronavirus-monitor.p.rapidapi.com',
    'x-rapidapi-key': '53009286a0mshdc8ec356f7aa205p1e0e80jsn5858f548ed53'
  }
};
const grabJSON = (url, details) => fetch(url, details).then(json);

// cache buster & data
const random = url => `${API_BASE}/${url}.php?_=${Math.random()}`;
const grabData = () => [
  grabJSON(random('worldstat'), details),
  grabJSON(random('cases_by_country'), details)
];

// box wrapper
const boxWrapper = ({
  total_cases,
  total_deaths,
  total_recovered,
  new_cases,
  new_deaths
}) => html`
   <div class="row">
  </div>
`;

// country details
const countryTable = ({countries_stat}) => html`
<div class="row">

                        <!-- Area Chart -->
                        <div class="col-xl-12 col-lg-12">
                            <div class="card shadow mb-4" id="table-card">                               
                                <!-- Card Header - Dropdown -->
                                <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                    <h6 class="m-0 font-weight-bold text-info">Confirmed Cases and Deaths by Country</h6>
                                    
                                </div>
                                <!-- Card Body -->
                                <div class="card-body">
                                <div class="table-responsive">
  <table id="country-detail" class="table table-striped table-bordered table-hover">
    <thead>
    <tr>
      <th>Country</th>
      <th>Cases</th>
      <th>New Cases</th>
      <th>Deaths</th>
      <th>New Deaths</th>
      <th>Active Cases</th>
      <th>Critical</th>
      <th>Recovered</th>
    </tr>
    </thead>
    <tbody>
    ${countries_stat.map(({
      country_name,
      cases,
      new_cases,
      deaths,
      new_deaths,
      active_cases,
      serious_critical,
      total_recovered
    }) => html`
      
      <tr>
        <td><b><i>${country_name}</i></b></td>
        <td>${cases}</td>
        <td><b class="text-warning">${new_cases}</b></td>
        <td>${deaths}</td>
        <td><b class="text-danger">${new_deaths}</b></td>
        <td>${active_cases}</td>
        <td>${serious_critical}</td>
        <td>${total_recovered}</td>
      </tr>
     
    `)}
    </tbody>
  </table>
  </div>
  </div>
  </div>
  </div>
  </div>
`;

// body view
const visualize = ([
  {
    total_cases,
    total_deaths,
    total_recovered,
    new_cases,
    new_deaths,
  },
  {countries_stat}
]) => {
  render(document.querySelector('#tracker'), html`
    <div id="content">
    <nav class="navbar navbar-expand navbar-light text-center bg-white topbar mb-4 static-top shadow">
      <div class="col-md-12">
                    <!-- Sidebar Toggle (Topbar) -->
                    <h5 class="font-weight-bold text-uppercase mb-1" style="display: contents;">COVID-19 CORONAVIRUS Tracker</h5>
      </div>
                </nav>
    <div class="container-fluid">
    
         <div class="row">
  <div class="col-xl-3 col-md-3 mb-4">
                            <div class="card border-left-info shadow h-100 py-2">
                                                                <div class="card-body">
                                    <div class="row no-gutters align-items-center">
                                        <div class="col mr-2">
                                            <div class="text-xs font-weight-bold text-info text-uppercase mb-1">Total Cases</div>
                                            <div class="row no-gutters align-items-center">
                                            <div class="col-auto">
                                                    <div class="h5 mb-0 mr-3 font-weight-bold text-gray-800">${total_cases}</div>
                                                </div>
                                                                                                
                                            </div>
                                        </div>
                                        <div class="col-auto">
                                            <i class="fa fa-users fa-2x text-info"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
    <div class="col-xl-3 col-md-3 mb-4">
                            <div class="card border-left-danger shadow h-100 py-2">
                                                                <div class="card-body">
                                    <div class="row no-gutters align-items-center">
                                        <div class="col mr-2">
                                            <div class="text-xs font-weight-bold text-danger text-uppercase mb-1">Total Death</div>
                                            <div class="row no-gutters align-items-center">
                                            <div class="col-auto">
                                                    <div class="h5 mb-0 mr-3 font-weight-bold text-gray-800">${total_deaths}</div>
                                                </div>
                                                                                                
                                            </div>
                                        </div>
                                        <div class="col-auto">
                                            <i class="fa fa-bed fa-2x text-danger"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
    <div class="col-xl-3 col-md-3 mb-4">
                            <div class="card border-left-success shadow h-100 py-2">
                                                                <div class="card-body">
                                    <div class="row no-gutters align-items-center">
                                        <div class="col mr-2">
                                            <div class="text-xs font-weight-bold text-success text-uppercase mb-1">Total Recovered</div>
                                            <div class="row no-gutters align-items-center">
                                            <div class="col-auto">
                                                    <div class="h5 mb-0 mr-3 font-weight-bold text-gray-800">${total_recovered}</div>
                                                </div>
                                                                                                
                                            </div>
                                        </div>
                                        <div class="col-auto">
                                            <i class="fa fa-child fa-2x text-success"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
    <div class="col-xl-3 col-md-3 mb-4">
                            <div class="card border-left-warning shadow h-100 py-2">
                                                                <div class="card-body">
                                    <div class="row no-gutters align-items-center">
                                        <div class="col mr-2">
                                            <div class="text-xs font-weight-bold text-warning text-uppercase mb-1">New Cases</div>
                                            <div class="row no-gutters align-items-center">
                                            <div class="col-auto">
                                                    <div class="h5 mb-0 mr-3 font-weight-bold text-gray-800">${new_cases}</div>
                                                </div>
                                                                                                
                                            </div>
                                        </div>
                                        <div class="col-auto">
                                            <i class="fa fa-bell fa-2x text-warning"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
  </div> 
        ${countryTable({countries_stat})}
        

    </div>
  
  `);
  setTimeout(update, 1000 * 60 * 10);
};

// updater
const update = () => Promise.all(grabData())
                            .then(visualize, console.error);

// bootstrap with update each 10 minutes
addEventListener('DOMContentLoaded', update, {once: true});
