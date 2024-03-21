import { useEffect, useState } from 'react';
let UserInfoView = (props: {user: {prenom: string, nom:string, email: string}, region: string}) => {

    return (
        <>
            <div className="card mb-4">
                <div className="card-body">
                    <div className="row">
                        <div className="col-sm-3">
                            <p className="mb-0">Nom</p>
                        </div>
                        <div className="col-sm-9">
                            <p className="text-muted mb-0">{ props.user ? props.user.nom : ''}</p>
                        </div>
                    </div>
                    <hr/>
                    <div className="row">
                        <div className="col-sm-3">
                            <p className="mb-0">Prenom</p>
                        </div>
                        <div className="col-sm-9">
                            <p className="text-muted mb-0">{ props.user ? props.user.prenom : ''}</p>
                        </div>
                    </div>
                    <hr/>
                    <div className="row">
                        <div className="col-sm-3">
                            <p className="mb-0">Email</p>
                        </div>
                        <div className="col-sm-9">
                            <p className="text-muted mb-0">{ props.user ? props.user.email : ''}</p>
                        </div>
                    </div>
                    <hr/>
                    <div className="row">
                        <div className="col-sm-3">
                            <p className="mb-0">Region</p>
                        </div>
                        <div className="col-sm-9">
                            <p className="text-muted mb-0">{ props.region ? props.region : ''}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export { UserInfoView }